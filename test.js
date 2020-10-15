function parseTime(timeInput, format){
  if (arguments.length === 0 || !timeInput) {
    return null
  }
  let time
  if(typeof timeInput === 'object'){
    time = timeInput
  } else {
    return null
  }
  const formatObj = {
    d: time.getDate().toString().padStart(2, 0),
    D: time.getDate().toString(),
    m: (time.getMonth() + 1).toString().padStart(2, 0),
    M: (time.getMonth() + 1).toString(),
    g: (time.getMonth() + 1).toString(),
    y: (time.getFullYear() % 100).toString().padStart(2, 0),
    Y: time.getFullYear().toString(),
    H: time.getHours().toString().padStart(2, 0),
    h: time.getHours() < 12 ? time.getHours() : time.getHours() - 12,
    l: time.getHours() < 12 ? time.getHours().toString().padStart(2,0) : (time.getHours() - 12).toString().padStart(2, 0), 
    k: time.getHours().toString(),
    i: time.getMinutes().toString().padStart(2, 0),
    I: time.getMinutes().toString(),
    s: time.getSeconds().toString().padStart(2, 0),
    S: time.getSeconds().toString(),
    w: time.getDay().toString(),
    p: time.getHours() < 12 ? 'AM' : 'PM'
  }
  let timeStr = format.replace(/{([dmMyYHiIsSDkghlwp])+}/g, (result, key) => {
    if(key === 'g'){
      const monthMap = new Map([
        ['1', 'January'], ['2', 'February'],['3', 'March'],['4', 'April'],['5', 'May'],['6', 'June'],
        ['7', 'July'],['8', 'August'],['9', 'September'],['10', 'October'],['11', 'November'],['12', 'December']
      ])
      return monthMap.get(formatObj[key])
    }
    if(key === 'w'){
      const weekdayMap = new Map([
        ['0', 'Thứ bảy'], ['1', 'Thứ hai'], ['2', 'Thứ ba'], ['3', 'Thứ tư'], ['4', 'Thứ năm'],
        ['5', 'Thứ sáu'], ['6', 'Thứ bảy']
      ])
      return weekdayMap.get(formatObj[key])
    }
    return formatObj[key]
  })
  return timeStr

}
var assert = require('assert');
const now = new Date()
now.setDate(5)
now.setMonth(6)
now.setFullYear(2002)
describe('Test parseTime', function () {
    it('should return null when no arguments', function () {
      assert.strictEqual(null, parseTime());
    });
    it('should return null when no time', function () {
      assert.strictEqual(null, parseTime(null));
    });
    it('should return null when time is not an object', function () {
      assert.strictEqual(null, parseTime(123));
      assert.strictEqual(null, parseTime('abc'));
      assert.strictEqual(null, parseTime(true));
    });
    it('test d', function () {
      assert.strictEqual('05', parseTime(now, '{d}'));
    });
    it('test D', function () {
      assert.strictEqual('5', parseTime(now, '{D}'));
    });
    it('test m', function () {
      assert.strictEqual('06', parseTime(now, '{m}'));
    });
    it('test M', function () {
      assert.strictEqual('6', parseTime(now, '{M}'));
    });
    it('test g', function () {
      assert.strictEqual('June', parseTime(now, '{g}'));
      now.setMonth(01)
      assert.strictEqual('January', parseTime(now, '{g}'));
    });
    it('test y', function () {
      assert.strictEqual('02', parseTime(now, '{y}'));
    });
    it('test Y', function () {
      assert.strictEqual('2002', parseTime(now, '{Y}'));
    });
    it('test H', function () {
      now.setHours(01)
      assert.strictEqual('01', parseTime(now, '{H}'));
      now.setHours(23)
      assert.strictEqual('23', parseTime(now, '{H}'));
    });
    it('test k', function () {
      now.setHours(01)
      assert.strictEqual('1', parseTime(now, '{k}'));
      now.setHours(23)
      assert.strictEqual('23', parseTime(now, '{k}'));
    });
    it('test h', function () {
      now.setHours(01)
      assert.strictEqual('1', parseTime(now, '{h}'));
      now.setHours(23)
      assert.strictEqual('11', parseTime(now, '{h}'));
    });
    it('test l', function () {
      now.setHours(01)
      assert.strictEqual('01', parseTime(now, '{l}'));
      now.setHours(23)
      assert.strictEqual('11', parseTime(now, '{l}'));
    });
    it('test i', function () {
      now.setMinutes(05)
      assert.strictEqual('05', parseTime(now, '{i}'));
      now.setMinutes(59)
      assert.strictEqual('59', parseTime(now, '{i}'));
    });
    it('test I', function () {
      now.setMinutes(05)
      assert.strictEqual('5', parseTime(now, '{I}'));
      now.setMinutes(59)
      assert.strictEqual('59', parseTime(now, '{I}'));
    });
    it('test s', function () {
      now.setSeconds(05)
      assert.strictEqual('05', parseTime(now, '{s}'));
      now.setSeconds(59)
      assert.strictEqual('59', parseTime(now, '{s}'));
    });
    it('test S', function () {
      now.setSeconds(05)
      assert.strictEqual('5', parseTime(now, '{S}'));
      now.setSeconds(59)
      assert.strictEqual('59', parseTime(now, '{S}'));
    });
    it('test w', function(){
      now.setFullYear(2020, 05, 17)
      assert.strictEqual('Thứ tư', parseTime(now, '{w}'))
    });
    it('test p', function(){
      now.setHours(6)
      assert.strictEqual('AM', parseTime(now, '{p}'))
      now.setHours(18)
      assert.strictEqual('PM', parseTime(now, '{p}'))
    }),
    it('test full', function () {
      now.setFullYear(2020, 05, 17)
      now.setHours(05, 06, 07)
      assert.strictEqual('17/05/20 05:06:07AM', parseTime(now, '{d}/{m}/{y} {l}:{i}:{s}{p}'))
      assert.strictEqual('17-5-2020 5:6:7', parseTime(now, '{D}-{M}-{Y} {h}:{I}:{S}'))
      assert.strictEqual('Thứ tư, ngày 17 tháng 05 năm 2020 05:06AM', parseTime(now, '{w}, ngày {d} tháng {m} năm {Y} {l}:{i}{p}'))
  });
});

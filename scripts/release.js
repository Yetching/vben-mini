const chalk = require('chalk');

const execa = require('execa');

const { prompt } = require('enquirer');

const step = (msg) => console.log(chalk.cyan(msg));

const run = (bin, args, opts = {}) =>
  execa(bin, args, {
    stdio: 'inherit',
    ...opts,
  });

function getLastTwoBitYear() {
  const date = new Date();
  const currentYear = date.getFullYear().toString();
  return currentYear.substr(currentYear.length - 2, 2);
}

function theWeek() {
  var totalDays = 0;
  now = new Date();
  var days = new Array(12);
  days[0] = 31;
  days[2] = 31;
  days[3] = 30;
  days[4] = 31;
  days[5] = 30;
  days[6] = 31;
  days[7] = 31;
  days[8] = 30;
  days[9] = 31;
  days[10] = 30;
  days[11] = 31;
  //判断是否为闰年，针对2月的天数进行计算
  if (Math.round(now.getYear() / 4) == now.getYear() / 4) {
    days[1] = 29;
  } else {
    days[1] = 28;
  }
  if (now.getMonth() == 0) {
    totalDays = totalDays + now.getDate();
  } else {
    var curMonth = now.getMonth();
    for (var count = 1; count <= curMonth; count++) {
      totalDays = totalDays + days[count - 1];
    }
    totalDays = totalDays + now.getDate();
  }
  //得到第几周
  var week = Math.round(totalDays / 7);
  return week;
}

async function main() {
  console.log(chalk.green('欢迎使用测试小助手'));
  step('\n是否进行代码提交...');
  const { yes } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: '确定已经完成代码修改并保存了吗?',
  });

  if (!yes) {
    step('小助手退出');
    return;
  }

  const { commitMsg } = await prompt({
    type: 'input',
    name: 'commitMsg',
    message: '请输入commit信息',
  });

  await run('git', ['add', '.']);
  await run('git', ['commit', '-m', commitMsg]);
  await run('git', ['push']);

  const year = getLastTwoBitYear();

  const week = theWeek();

  const targetVersion = (
    await prompt({
      type: 'input',
      name: 'version',
      message: '这是本周第几次发版? (请输入数字)',
    })
  ).version;

  const serviceName = (
    await prompt({
      type: 'input',
      name: 'serviceName',
      message: '请输入这个前端服务的名字或代号? (如: his_retina)',
    })
  ).serviceName;

  const tagName = `Cloud_R-12.${year}.${week}.${
    targetVersion > 10 ? targetVersion : `0${targetVersion}`
  }-${serviceName}`;

  const comment = `${serviceName}服务${week}周/迭代第${targetVersion}次版本发布`;

  await run('git', ['tag', tagName, '-m', comment]);

  await run('git', ['push', '--tags']);

  console.log('稍等片刻即可完成版本发布');
}

main().catch((e) => {
  console.log(e);
});

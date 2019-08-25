import { CronJob } from 'cron';
import Member from './models/Member';
import Status from './config/status';

export default new CronJob({
  cronTime: '0 50 19 * * 0-5',
  onTick: async () => {
    const member = await Member.find();
    member.map((mem) => ({
      grade: mem.grade,
      class: mem.class,
      total: 0, // 디미고인에서 가져오기
      current: 0, // 디미고인에서 가져오기
      status: () => {
        const s = [];
        for (let i = 0; i < 35; i += 1) {
          s[i] = Status.class;
        }
        return s;
      },
    }));
    // eslint-disable-next-line no-console
    console.log('reset db');
  },
  start: false,
  timeZone: 'Asia/Seoul',
});

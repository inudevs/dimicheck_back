import { CronJob } from 'cron';
import Member from './models/Member';
import Status from './config/status';

export default new CronJob({
  // 일요일 ~ 금요일 7시 정각에 실행
  cronTime: '0 0 7 * * 0-5',
  // 실행할 내용
  onTick: async () => {
    // 데이터베이스에서 Member값을 가져옴
    const member = await Member.find();
    // 반의 개수만큼 (18개)
    for (let i = 0; i < member.length; i += 1) {
      // 모든 학생의 상태를 Class로 초기화
      const s = [];
      for (let j = 0; j < 35; j += 1) {
        s[j] = [Status.class, Status.class];
      }
      Member.updateOne(
        member[i],
        {
          status: s,
        },
        (err) => {
          if (err) {
            // eslint-disable-next-line no-console
            console.error(err);
          }
        },
      );
    }
    // eslint-disable-next-line no-console
    console.log('reset database');
  },
  start: false,
  timeZone: 'Asia/Seoul',
});

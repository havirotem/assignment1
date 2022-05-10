import { Injectable, Render } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  gapBetwween = (x: any) => {
    x.map((c: any) => {
      const { experience } = c;
      // console.log(c);
      if (experience && experience != 'no experience') {
        const ranges = experience?.sort(
          (a, b) => a.startDateTime - b.startDateTime,
        );
        const holes = [];
        for (var i = 1; i < ranges.length; i++) {
          var beginningOfHole = ranges[i - 1].endDateTime;
          var endOfHole = ranges[i].startDateTime;
          if (beginningOfHole < endOfHole) {
            holes.push({ from: beginningOfHole + 1, end: endOfHole - 1 });
          }
        }
        console.log(holes);
      }
    });
  };

  async parseJson() {
    try {
      const url =
        'https://hs-resume-data.herokuapp.com/v3/candidates/all_data_b1f6-acde48001122';
      const response = await fetch(url, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (!data) {
        return;
      }
      const canList = [];
      data.map((candidate) => {
        let canExperience = 'no experience';
        const canName = candidate?.contact_info.name?.formatted_name;
        const { experience } = candidate;
        if (!experience || !experience.length) {
          canList.push({ name: canName, experience: canExperience });
        } else {
          let y = [];
          experience.map((ex) => {
            y.push({
              company: ex?.company_normalized_name,
              endDateTime: new Date(ex?.end_date).getTime(),
              end_date: ex?.end_date,
              start_date: ex?.start_date,
              startDateTime: new Date(ex?.start_date).getTime(),
            });
          });

          canList.push({
            name: canName,
            experience: y,
          });
        }
      });
      this.gapBetwween(canList);
      return canList;
    } catch (err) {
      console.log(err);
    }
  }
}

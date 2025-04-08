import http from "k6/http";
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { check, sleep,group } from "k6";

export let options = {
  stages: [
    { duration: "5s", target: 5 }, // Ramp up to 10 users in 10 seconds
  ],
  summaryTrendStats: ['avg', 'med', 'p(50)', 'p(90)', 'p(95)', 'p(99)']
};

export default function () {
 

    let res = http.get(`http://localhost:3000/lookup?code=nzeOQ5oq`);
    check(res, { 'long url status 200': (r) => r.status === 200 });

    // console.log(`Response Status: ${res.status}`);
    sleep(1);
}
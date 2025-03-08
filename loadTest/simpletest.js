import http from "k6/http";
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { check, sleep,group } from "k6";

export let options = {
  stages: [
    { duration: "30s", target: 1000 }, // Ramp up to 10 users in 10 seconds
  ],
  summaryTrendStats: ['avg', 'med', 'p(50)', 'p(90)', 'p(95)', 'p(99)']
};


export default function () {
 

  group('Both endpoints', function () {
    let payload = JSON.stringify({
      longUrl: `www.${randomString(8)}`
  });
  let params = {
    headers: { "Content-Type": "application/json" },
  };
    let getShortCode = http.post('http://localhost:3000/shorten', payload,params);

    check(getShortCode, { 'short code status 201': (r) => r.status === 201 });
    let responseData = JSON.parse(getShortCode.body)
    // console.log(`Response Status: ${getShortCode.status},${responseData.shortcode}`);

    let ShotCodeResponse=responseData.shortcode;
    
    let res = http.get(`http://localhost:3000/redirect?code=${ShotCodeResponse}`,{ redirects: 0 });
    check(res, { 'long url status 302': (r) => r.status === 302 || r.status === 301 });

    // console.log(`Response Status: ${res.status}`);
    sleep(1);
});
 
}

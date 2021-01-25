const { User } = require("../models/User");

let auth = (req, res, next) => {
  // 인증 처리
  // 클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies.x_auth;

  // 토큰을 복호화 한 후 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    // 유저가 있으면 인증 OK
    // 없으면 인증 NOK
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    // 다음 실행될 콜백 함수에서 사용될 request 정보 편집
    req.token = token;
    req.user = user;

    next();
  });
};

module.exports = { auth };

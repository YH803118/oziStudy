const Sequelize = require("sequelize"); //sequeilze패키지가 공개하는 sequelize클래스를 로드

const env = process.env.NODE_ENV || "development"; //개발용도라면 development,서비스 배포용이라면 node_env라는 환경변수를사용 헤로쿠는 환경변수를 우선으로 실행하는듯
//node_env라는 환경변수는 이 코드의 실행용도를 설정하기 위해쓰이는 환경 변수이다.
const config = require("../config/config")[env];

const {
  //config.json객체의 정보를 변수에 저장
  username,
  password,
  database,
  host,
  dialect,
} = config; //Database접속에관한 설정값을넣고 sequlieze객체를 생성
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});

const Member = require("./member")(sequelize, Sequelize.DataTypes); //sequelize 객체를 사용해 초기화하고 데이터베이스에 존재하는 members테이블을 인식하게된다

const db = {};
db.Member = Member;

module.exports = db;

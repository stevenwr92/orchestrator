const Redis = require("ioredis");
const redis = new Redis({
  port: 12931, // Redis port
  host: "redis-12931.c252.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  username: "default", // needs Redis >= 6
  password: "m4YUjU8diQ57QAdKIgeGoDuKhrmwX71E",
  db: 0, // Defaults to 0
});

module.exports = redis;

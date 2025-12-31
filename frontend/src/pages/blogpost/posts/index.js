import { post1 } from "./post1.js";
import { post2 } from "./post2.js";
import { post3 } from "./post3.js";
import { post4 } from "./post4.js";
import { post5 } from "./post5.js";
import { post6 } from "./post6.js";
import { post7 } from "./post7.js";
import { post8 } from "./post8.js";

export const allPosts = {
  1: post1,
  2: post2,
  3: post3,
  4: post4,
  5: post5,
  6: post6,
  7: post7,
  8: post8,
};

export const getAllPosts = () => Object.values(allPosts);


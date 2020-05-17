/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50728
Source Host           : localhost:3306
Source Database       : play

Target Server Type    : MYSQL
Target Server Version : 50728
File Encoding         : 65001

Date: 2020-05-17 12:04:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for qqinfo
-- ----------------------------
DROP TABLE IF EXISTS `qqinfo`;
CREATE TABLE `qqinfo` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `qqname` varchar(255) DEFAULT NULL,
  `qqpwd` varchar(255) DEFAULT NULL,
  `palyname` varchar(255) DEFAULT NULL,
  `qu` varchar(255) DEFAULT NULL,
  `status` int(5) DEFAULT '1',
  `create_time` int(12) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qqinfo
-- ----------------------------
INSERT INTO `qqinfo` VALUES ('1', '732345907', 'youshihou', null, null, '0', '1589625855');
INSERT INTO `qqinfo` VALUES ('2', '463039166', '121212221', null, null, '0', '1589639013');
INSERT INTO `qqinfo` VALUES ('3', '654546564', '654546654546', null, null, '0', '1589639023');
INSERT INTO `qqinfo` VALUES ('4', '4630391155', '1212122', null, null, '0', '1589639080');
INSERT INTO `qqinfo` VALUES ('5', '456789213', '213321123231', null, null, '0', '1589639183');
INSERT INTO `qqinfo` VALUES ('6', '56789', '123456', '111', '1', '0', '1589684857');
INSERT INTO `qqinfo` VALUES ('7', '654465', '132213213', '2222', '2', '0', '1589688022');
INSERT INTO `qqinfo` VALUES ('8', 'rrrr', 'rrrr', '2222', '1', '0', '1589688083');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `users` varchar(200) DEFAULT NULL,
  `pwd` varchar(32) DEFAULT NULL,
  `status` int(3) DEFAULT '1' COMMENT '1 =>ok 0=>delete',
  `create_time` int(12) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', '', '123456', '0', null);
INSERT INTO `users` VALUES ('2', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '1', '1589519635');

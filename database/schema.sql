-- EarthOL-Community Database Schema
-- 地球OL全球玩家社区数据库结构

CREATE DATABASE IF NOT EXISTS earthol CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE earthol;

-- 4.1 用户表
CREATE TABLE `user` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
    `email` VARCHAR(100) NOT NULL UNIQUE COMMENT '邮箱',
    `password` VARCHAR(255) NOT NULL COMMENT '密码(哈希)',
    `nickname` VARCHAR(50) COMMENT '昵称',
    `avatar` VARCHAR(255) COMMENT '头像URL',
    `level` TINYINT UNSIGNED DEFAULT 1 COMMENT '权限等级:1-普通,2-版主,3-管理员',
    `experience` INT UNSIGNED DEFAULT 0 COMMENT '经验值',
    `region` VARCHAR(50) DEFAULT 'global' COMMENT '所属大区',
    `last_login_at` DATETIME,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (`email`),
    INDEX idx_username (`username`),
    INDEX idx_region (`region`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 4.2 论坛板块表
CREATE TABLE `forum_category` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL COMMENT '板块名称',
    `slug` VARCHAR(50) NOT NULL UNIQUE COMMENT '板块标识',
    `description` TEXT COMMENT '板块描述',
    `icon` VARCHAR(100) COMMENT '图标',
    `sort_order` INT DEFAULT 0 COMMENT '排序',
    `parent_id` INT UNSIGNED COMMENT '父板块ID',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_parent (`parent_id`),
    INDEX idx_sort (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='论坛板块表';

-- 4.3 帖子表
CREATE TABLE `forum_post` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT UNSIGNED NOT NULL COMMENT '作者ID',
    `category_id` INT UNSIGNED NOT NULL COMMENT '板块ID',
    `title` VARCHAR(200) NOT NULL COMMENT '标题',
    `content` TEXT NOT NULL COMMENT '内容',
    `view_count` INT UNSIGNED DEFAULT 0 COMMENT '浏览量',
    `like_count` INT UNSIGNED DEFAULT 0 COMMENT '点赞数',
    `comment_count` INT UNSIGNED DEFAULT 0 COMMENT '评论数',
    `is_top` TINYINT DEFAULT 0 COMMENT '是否置顶',
    `is_essence` TINYINT DEFAULT 0 COMMENT '是否精华',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`category_id`) REFERENCES `forum_category`(`id`) ON DELETE CASCADE,
    INDEX idx_category (`category_id`),
    INDEX idx_user (`user_id`),
    INDEX idx_created (`created_at`),
    INDEX idx_top (`is_top`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='帖子表';

-- 4.4 评论表
CREATE TABLE `forum_comment` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `post_id` INT UNSIGNED NOT NULL COMMENT '帖子ID',
    `user_id` INT UNSIGNED NOT NULL COMMENT '评论者ID',
    `parent_id` INT UNSIGNED COMMENT '父评论ID(楼中楼)',
    `content` TEXT NOT NULL COMMENT '评论内容',
    `like_count` INT UNSIGNED DEFAULT 0 COMMENT '点赞数',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`post_id`) REFERENCES `forum_post`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`parent_id`) REFERENCES `forum_comment`(`id`) ON DELETE CASCADE,
    INDEX idx_post (`post_id`),
    INDEX idx_user (`user_id`),
    INDEX idx_parent (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='评论表';

-- 4.5 全球实时数据表
CREATE TABLE `earth_data` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `total_population` BIGINT UNSIGNED NOT NULL COMMENT '全球总人口',
    `births_today` INT UNSIGNED DEFAULT 0 COMMENT '今日出生',
    `deaths_today` INT UNSIGNED DEFAULT 0 COMMENT '今日死亡',
    `births_this_year` INT UNSIGNED DEFAULT 0 COMMENT '本年出生',
    `deaths_this_year` INT UNSIGNED DEFAULT 0 COMMENT '本年死亡',
    `online_players` INT UNSIGNED DEFAULT 0 COMMENT '当前在线玩家',
    `recorded_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_recorded (`recorded_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='全球实时数据表';

-- 4.6 大区数据表
CREATE TABLE `region_data` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `region_code` VARCHAR(50) NOT NULL UNIQUE COMMENT '大区代码',
    `region_name` VARCHAR(100) NOT NULL COMMENT '大区名称',
    `population` BIGINT UNSIGNED COMMENT '人口',
    `version` VARCHAR(20) DEFAULT 'v1.0' COMMENT '版本分层',
    `is_high_risk` TINYINT DEFAULT 0 COMMENT '是否高危战乱服',
    `is_continuous_civilization` TINYINT DEFAULT 0 COMMENT '是否不断代文明',
    `last_updated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_code (`region_code`),
    INDEX idx_risk (`is_high_risk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='大区数据表';

-- 4.7 AI对话记忆表
CREATE TABLE `ai_chat_memory` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT UNSIGNED NOT NULL COMMENT '用户ID',
    `session_id` VARCHAR(100) NOT NULL COMMENT '会话ID',
    `role` ENUM('user', 'assistant') NOT NULL COMMENT '角色',
    `content` TEXT NOT NULL COMMENT '内容',
    `thought_chain` TEXT COMMENT '思维链',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
    INDEX idx_user_session (`user_id`, `session_id`),
    INDEX idx_created (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='AI对话记忆表';

-- 4.8 私信表
CREATE TABLE `message_private` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `from_user_id` INT UNSIGNED NOT NULL COMMENT '发送者ID',
    `to_user_id` INT UNSIGNED NOT NULL COMMENT '接收者ID',
    `content` TEXT NOT NULL COMMENT '内容',
    `is_read` TINYINT DEFAULT 0 COMMENT '是否已读',
    `read_at` DATETIME,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`from_user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`to_user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
    INDEX idx_from_to (`from_user_id`, `to_user_id`),
    INDEX idx_to (`to_user_id`),
    INDEX idx_unread (`to_user_id`, `is_read`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='私信表';

-- 点赞表
CREATE TABLE `post_like` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT UNSIGNED NOT NULL,
    `post_id` INT UNSIGNED NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`post_id`) REFERENCES `forum_post`(`id`) ON DELETE CASCADE,
    UNIQUE KEY uk_user_post (`user_id`, `post_id`),
    INDEX idx_post (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='帖子点赞表';

-- 收藏表
CREATE TABLE `post_favorite` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT UNSIGNED NOT NULL,
    `post_id` INT UNSIGNED NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`post_id`) REFERENCES `forum_post`(`id`) ON DELETE CASCADE,
    UNIQUE KEY uk_user_post (`user_id`, `post_id`),
    INDEX idx_user (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='帖子收藏表';

-- 插入初始大区数据
INSERT INTO `region_data` (`region_code`, `region_name`, `version`, `is_continuous_civilization`) VALUES
('huaxia', '华夏服', 'v5.0', 1),
('america', '美洲服', 'v3.0', 0),
('europe', '欧洲服', 'v3.5', 0),
('africa', '非洲服', 'v2.0', 0),
('oceania', '大洋洲服', 'v2.5', 0),
('asia_other', '亚洲其他', 'v3.0', 0);

-- 插入初始板块数据
INSERT INTO `forum_category` (`name`, `slug`, `description`, `sort_order`) VALUES
('探索发现', 'explore', '分享你的探索发现', 1),
('经验交流', 'experience', '交流游戏心得与经验', 2),
('求助问答', 'qa', '有问题来这里问', 3),
('资源分享', 'resources', '分享有用的资源', 4),
('公告通知', 'announcement', '官方公告和重要通知', 5);

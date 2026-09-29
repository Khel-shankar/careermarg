-- Migration for Teacher / Counselor Module in CareerMarg v3
CREATE TABLE IF NOT EXISTS `counseling_records` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `student_id` VARCHAR(64) NOT NULL,
  `counselor_id` VARCHAR(64) NOT NULL,
  `counselor_name` VARCHAR(128) DEFAULT 'Dr. Sunita Sharma',
  `session_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `session_topic` VARCHAR(192) DEFAULT 'Stream Selection & Psychometric Review',
  `status` ENUM('scheduled', 'completed', 'follow_up_needed', 'action_plan_shared') DEFAULT 'completed',
  `counselor_notes` TEXT DEFAULT NULL,
  `recommended_stream` VARCHAR(64) DEFAULT 'Science (PCM / AI & Tech)',
  `recommended_careers_json` LONGTEXT DEFAULT NULL,
  `action_items` TEXT DEFAULT NULL,
  `parent_contacted` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `idx_counsel_student` (`student_id`),
  KEY `idx_counsel_counselor` (`counselor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`id`, `role`, `email`, `password_hash`, `full_name`, `grade_level`, `school_name`, `city`, `stream`)
VALUES 
('counselor_demo', 'counselor', 'counselor@careermarg.org', '$2y$10$hzr.k2s61.4dhDZNPX8kd.i4ZysTKQKSi0r0LRssVuaUIdsBIrUVa', 'Dr. Sunita Sharma', 'Faculty Head', 'CareerMarg Central Counseling Cell', 'New Delhi', 'general'),
('teacher_demo', 'teacher', 'teacher@careermarg.org', '$2y$10$hzr.k2s61.4dhDZNPX8kd.i4ZysTKQKSi0r0LRssVuaUIdsBIrUVa', 'Prof. Rajesh Verma', 'PGT Head', 'Delhi Public School & Career Wing', 'New Delhi', 'science_pcm')
ON DUPLICATE KEY UPDATE `full_name` = VALUES(`full_name`), `role` = VALUES(`role`), `grade_level` = VALUES(`grade_level`), `school_name` = VALUES(`school_name`);

INSERT INTO `counseling_records` (`student_id`, `counselor_id`, `counselor_name`, `session_date`, `session_topic`, `status`, `counselor_notes`, `recommended_stream`, `action_items`, `parent_contacted`)
VALUES
('rahul_demo_example_com', 'counselor_demo', 'Dr. Sunita Sharma', NOW() - INTERVAL 2 DAY, 'Class 10 Stream Selection & AI Career Roadmap', 'completed', 'Rahul displays exceptional Investigative (88%) & Enterprising (82%) trait alignment. Tamanna Numerical & Abstract reasoning are in top 95th percentile. Strongly recommended for Science PCM with Computer Science.', 'Science (PCM with Computer Science)', '1. Enroll in JEE Main foundation & Python programming.\n2. Connect with industry mentor Rohit Verma on CareerMarg.\n3. Maintain 85%+ score in Math & Physics.', 1),
('usr_aman_test_1790249573500_gmail_com', 'counselor_demo', 'Dr. Sunita Sharma', NOW() - INTERVAL 1 DAY, 'Robotics & AI Engineering Pathway Alignment', 'completed', 'Aman demonstrates high mechanical aptitude and hands-on inclination. Discussed difference between pure Computer Science and Mechatronics / Robotics Engineering.', 'Science (PCM with CS / Mechatronics)', '1. Explore Atal Tinkering Lab robotics competitions.\n2. Review entrance requirements for BITSAT & JEE Advanced.', 1),
('usr_ankit_khare_gmail_com', 'counselor_demo', 'Dr. Sunita Sharma', NOW() + INTERVAL 2 DAY, 'Cloud Architecture & DevOps Post-Graduation Strategy', 'scheduled', 'Upcoming 1:1 session to discuss postgraduate certifications (AWS Solutions Architect, CKA) and career progression into senior DevOps.', 'Engineering & Cloud Technology', 'Prepare resume portfolio and list of target tech companies for review.', 0)
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`);

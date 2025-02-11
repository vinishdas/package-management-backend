-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 29, 2024 at 02:27 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `package_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `dateDelivered` date NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `receptionist_table`
--

CREATE TABLE `receptionist_table` (
  `receptionist_id` varchar(20) NOT NULL,
  `receptionist_name` varchar(100) DEFAULT NULL,
  `year_joined` int(11) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `receptionist_table`
--

INSERT INTO `receptionist_table` (`receptionist_id`, `receptionist_name`, `year_joined`, `phone`, `password`, `role`) VALUES
('4SF2021R01', 'Sophia Miller', 2021, '7045678901', 'receptionPass567', 'receptionist'),
('4SF2022R01', 'John Watson', 2022, '7023456789', 'receptionPass345', 'receptionist'),
('4SF2022R02', 'Lucy Wilson', 2022, '7034567890', 'receptionPass456', 'receptionist'),
('4SF2023R01', 'Mary Davis', 2023, '7001234567', 'receptionPass123', 'receptionist'),
('4SF2023R02', 'Peter Clark', 2023, '7012345678', 'receptionPass234', 'receptionist');

--
-- Triggers `receptionist_table`
--
DELIMITER $$
CREATE TRIGGER `after_receptionist_delete` AFTER DELETE ON `receptionist_table` FOR EACH ROW BEGIN
    DELETE FROM users WHERE id = OLD.receptionist_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_receptionist_insert` BEFORE INSERT ON `receptionist_table` FOR EACH ROW BEGIN
    IF NOT EXISTS (
        SELECT id FROM users WHERE id = NEW.receptionist_id
    ) THEN
        INSERT INTO users (id, name, phone, role, password)
        VALUES (NEW.receptionist_id, NEW.receptionist_name, NEW.phone, NEW.role, NEW.password);
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `student_table`
--

CREATE TABLE `student_table` (
  `student_id` varchar(20) NOT NULL,
  `student_name` varchar(100) DEFAULT NULL,
  `semester` int(11) DEFAULT NULL,
  `year_joined` int(11) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_table`
--

INSERT INTO `student_table` (`student_id`, `student_name`, `semester`, `year_joined`, `phone`, `password`, `role`) VALUES
('4SF2018CS02', 'Jack Brown', 6, 2018, '9901234567', 'studentPass147', 'student'),
('4SF2019IS01', 'Henry Moore', 5, 2019, '9789012345', 'studentPass951', 'student'),
('4SF2019MC02', 'Isabella Black', 4, 2019, '9890123456', 'studentPass753', 'student'),
('4SF2020CS03', 'Frank White', 4, 2020, '9567890123', 'studentPass987', 'student'),
('4SF2020DS02', 'Grace Green', 3, 2020, '9678901234', 'studentPass852', 'student'),
('4SF2021MC01', 'Evelyn Brown', 1, 2021, '9456789012', 'studentPass789', 'student'),
('4SF2022DS01', 'David Lee', 2, 2022, '9345678901', 'studentPass654', 'student'),
('4SF2022IS01', 'Carol Smith', 3, 2022, '9234567890', 'studentPass456', 'student'),
('4SF2023CS01', 'Alice', 1, 2023, '9876543210', 'password456', 'student'),
('4SF2023CS02', 'Alice Johnson', 1, 2023, '9876543210', 'studentPass123', 'student'),
('4SF22CS056', 'VINISH', 5, 2024, '6666666666', '1234567', 'STUDENT'),
('4SF22CS34', 'ARYAN ', 3, 20223, '6374837564', 'PASSWORD', 'student');

--
-- Triggers `student_table`
--
DELIMITER $$
CREATE TRIGGER `before_student_insert` BEFORE INSERT ON `student_table` FOR EACH ROW BEGIN
    IF NOT EXISTS (
        SELECT id FROM users WHERE id = NEW.student_id
    ) THEN
        INSERT INTO users (id, name, phone, role, password)
        VALUES (NEW.student_id, NEW.student_name, NEW.phone, NEW.role, NEW.password);
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `teacher_table`
--

CREATE TABLE `teacher_table` (
  `teacher_id` varchar(20) NOT NULL,
  `teacher_name` varchar(100) DEFAULT NULL,
  `year_joined` int(11) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teacher_table`
--

INSERT INTO `teacher_table` (`teacher_id`, `teacher_name`, `year_joined`, `phone`, `password`, `role`) VALUES
('4SF2017IS01', 'Dr. Jack Morgan', 2017, '8090123456', 'teacherPass012', 'teacher'),
('4SF2018CS03', 'Dr. Isabella Rogers', 2018, '8089012345', 'teacherPass901', 'teacher'),
('4SF2019MC01', 'Dr. Henry Baker', 2019, '8078901234', 'teacherPass890', 'teacher'),
('4SF2020DS02', 'Dr. Grace Nelson', 2020, '8067890123', 'teacherPass789', 'teacher'),
('4SF2020IS01', 'Dr. Frank Adams', 2020, '8056789012', 'teacherPass678', 'teacher'),
('4SF2021CS02', 'Dr. Evelyn Campbell', 2021, '8045678901', 'teacherPass567', 'teacher'),
('4SF2022DS01', 'Dr. David Mitchell', 2022, '8034567890', 'teacherPass456', 'teacher'),
('4SF2022MC01', 'Dr. Carol Turner', 2022, '8023456789', 'teacherPass345', 'teacher'),
('4SF2023CS01', 'Dr. Alice Carter', 2023, '8001234567', 'teacherPass123', 'teacher'),
('4SF2023IS02', 'Dr. Bob Harrison', 2023, '8012345678', 'teacherPass234', 'teacher');

--
-- Triggers `teacher_table`
--
DELIMITER $$
CREATE TRIGGER `after_teacher_delete` AFTER DELETE ON `teacher_table` FOR EACH ROW BEGIN
    DELETE FROM users WHERE id = OLD.teacher_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_teacher_insert` BEFORE INSERT ON `teacher_table` FOR EACH ROW BEGIN
    IF NOT EXISTS (
        SELECT id FROM users WHERE id = NEW.teacher_id
    ) THEN
        INSERT INTO users (id, name, phone, role, password)
        VALUES (NEW.teacher_id, NEW.teacher_name, NEW.phone, NEW.role, NEW.password);
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `unknown_packages`
--

CREATE TABLE `unknown_packages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(15) NOT NULL,
  `dateDelivered` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `role` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `phone`, `role`, `password`) VALUES
('4SF2017IS01', 'Dr. Jack Morgan', '8090123456', 'teacher', 'teacherPass012'),
('4SF2018CS02', 'Jack Brown', '9901234567', 'student', 'studentPass147'),
('4SF2018CS03', 'Dr. Isabella Rogers', '8089012345', 'teacher', 'teacherPass901'),
('4SF2019IS01', 'Henry Moore', '9789012345', 'student', 'studentPass951'),
('4SF2019MC01', 'Dr. Henry Baker', '8078901234', 'teacher', 'teacherPass890'),
('4SF2019MC02', 'Isabella Black', '9890123456', 'student', 'studentPass753'),
('4SF2020CS03', 'Frank White', '9567890123', 'student', 'studentPass987'),
('4SF2020DS02', 'Grace Green', '9678901234', 'student', 'studentPass852'),
('4SF2020IS01', 'Dr. Frank Adams', '8056789012', 'teacher', 'teacherPass678'),
('4SF2021CS02', 'Dr. Evelyn Campbell', '8045678901', 'teacher', 'teacherPass567'),
('4SF2021MC01', 'Evelyn Brown', '9456789012', 'student', 'studentPass789'),
('4SF2021R01', 'Sophia Miller', '7045678901', 'receptionist', 'receptionPass567'),
('4SF2022DS01', 'David Lee', '9345678901', 'student', 'studentPass654'),
('4SF2022IS01', 'Carol Smith', '9234567890', 'student', 'studentPass456'),
('4SF2022MC01', 'Dr. Carol Turner', '8023456789', 'teacher', 'teacherPass345'),
('4SF2022R01', 'John Watson', '7023456789', 'receptionist', 'receptionPass345'),
('4SF2022R02', 'Lucy Wilson', '7034567890', 'receptionist', 'receptionPass456'),
('4SF2023CS01', 'Dr. Alice Carter', '8001234567', 'teacher', 'teacherPass123'),
('4SF2023CS02', 'Alice Johnson', '9876543210', 'student', 'studentPass123'),
('4SF2023IS02', 'Dr. Bob Harrison', '8012345678', 'teacher', 'teacherPass234'),
('4SF2023R01', 'Mary Davis', '7001234567', 'receptionist', 'receptionPass123'),
('4SF2023R02', 'Peter Clark', '7012345678', 'receptionist', 'receptionPass234'),
('4SF22CS056', 'VINISH', '6666666666', 'STUDENT', '1234567'),
('4SF22CS34', 'ARYAN ', '6374837564', 'student', 'PASSWORD'),
('admin123', 'Admin User', '1234567890', 'admin', 'adminpassword');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `phone` (`phone`);

--
-- Indexes for table `receptionist_table`
--
ALTER TABLE `receptionist_table`
  ADD PRIMARY KEY (`receptionist_id`);

--
-- Indexes for table `student_table`
--
ALTER TABLE `student_table`
  ADD PRIMARY KEY (`student_id`);

--
-- Indexes for table `teacher_table`
--
ALTER TABLE `teacher_table`
  ADD PRIMARY KEY (`teacher_id`);

--
-- Indexes for table `unknown_packages`
--
ALTER TABLE `unknown_packages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `unknown_packages`
--
ALTER TABLE `unknown_packages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `packages`
--
ALTER TABLE `packages`
  ADD CONSTRAINT `packages_ibfk_1` FOREIGN KEY (`phone`) REFERENCES `users` (`phone`);

--
-- Constraints for table `receptionist_table`
--
ALTER TABLE `receptionist_table`
  ADD CONSTRAINT `fk_receptionist_user` FOREIGN KEY (`receptionist_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_table`
--
ALTER TABLE `student_table`
  ADD CONSTRAINT `fk_student_user` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teacher_table`
--
ALTER TABLE `teacher_table`
  ADD CONSTRAINT `fk_teacher_user` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

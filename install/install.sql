--
-- Tabelstructuur voor tabel `cf_ct_tickets`
--

DROP TABLE IF EXISTS `cf_ct_tickets`;
CREATE TABLE IF NOT EXISTS `cf_ct_tickets` (
  `model_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`model_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `go_links_ct_tickets`
--

DROP TABLE IF EXISTS `go_links_ct_tickets`;
CREATE TABLE IF NOT EXISTS `go_links_ct_tickets` (
  `id` int(11) NOT NULL,
  `folder_id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL,
  `model_type_id` int(11) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `ctime` int(11) NOT NULL,
  KEY `link_id` (`model_id`,`model_type_id`),
  KEY `id` (`id`,`folder_id`),
  KEY `ctime` (`ctime`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------



-- Tabelstructuur voor tabel `ct_categories`
--

DROP TABLE IF EXISTS `ct_categories`;
CREATE TABLE IF NOT EXISTS `ct_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `acl_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `files_folder_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `ct_tickets`
--

DROP TABLE IF EXISTS `ct_tickets`;
CREATE TABLE IF NOT EXISTS `ct_tickets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `ctime` int(11) NOT NULL DEFAULT '0',
  `mtime` int(11) NOT NULL DEFAULT '0',
  `muser_id` int(11) NOT NULL DEFAULT '0',
  `send_email` int(11) NOT NULL DEFAULT '0',
  `name` varchar(100) DEFAULT NULL,
  `content` text,
  `files_folder_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `category_id` (`category_id`),
  KEY `status_id` (`status_id`),
  FULLTEXT KEY `content` (`content`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
--
-- Tabelstructuur voor tabel `cf_statuses`
--


DROP TABLE IF EXISTS `ct_statuses`;
CREATE TABLE IF NOT EXISTS `ct_statuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `template_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `ct_ticket_statuses`;
CREATE TABLE IF NOT EXISTS `ct_ticket_statuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ticket_id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL,
  `email_uid` varchar(100) NOT NULL,
  `email_mailbox` varchar(100) NOT NULL,
  `email_account_id` int(11) NOT NULL,
  `email_sent` int(11) NOT NULL,
  `ctime` int(11) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;


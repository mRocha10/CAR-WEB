-- Base relational model for the Components section (MySQL compatible)

CREATE TABLE categories (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  parent_id VARCHAR(64) NULL,
  rationale TEXT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  INDEX idx_categories_parent (parent_id)
);

CREATE TABLE components (
  id VARCHAR(64) PRIMARY KEY,
  sku VARCHAR(80) NOT NULL UNIQUE,
  name VARCHAR(180) NOT NULL,
  category_id VARCHAR(64) NOT NULL,
  subgroup VARCHAR(120) NOT NULL,
  short_description TEXT NOT NULL,
  long_description TEXT NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE prices (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  component_id VARCHAR(64) NOT NULL,
  currency CHAR(3) NOT NULL DEFAULT 'EUR',
  price DECIMAL(10,2) NOT NULL,
  previous_price DECIMAL(10,2) NULL,
  valid_from DATETIME NULL,
  valid_to DATETIME NULL,
  FOREIGN KEY (component_id) REFERENCES components(id),
  INDEX idx_prices_component (component_id)
);

CREATE TABLE specifications (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  component_id VARCHAR(64) NOT NULL,
  spec_key VARCHAR(80) NOT NULL,
  spec_value VARCHAR(255) NOT NULL,
  FOREIGN KEY (component_id) REFERENCES components(id),
  INDEX idx_specs_component (component_id)
);

CREATE TABLE vehicle_makes (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL UNIQUE
);

CREATE TABLE vehicle_models (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  make_id BIGINT NOT NULL,
  name VARCHAR(120) NOT NULL,
  FOREIGN KEY (make_id) REFERENCES vehicle_makes(id),
  INDEX idx_models_make (make_id)
);

CREATE TABLE vehicle_versions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  model_id BIGINT NOT NULL,
  year INT NOT NULL,
  engine VARCHAR(120) NULL,
  FOREIGN KEY (model_id) REFERENCES vehicle_models(id),
  INDEX idx_versions_model_year (model_id, year)
);

CREATE TABLE compatibility (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  component_id VARCHAR(64) NOT NULL,
  version_id BIGINT NOT NULL,
  oem_ref VARCHAR(120) NULL,
  notes TEXT NULL,
  FOREIGN KEY (component_id) REFERENCES components(id),
  FOREIGN KEY (version_id) REFERENCES vehicle_versions(id),
  INDEX idx_compat_component (component_id),
  INDEX idx_compat_version (version_id)
);

CREATE TABLE images (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  component_id VARCHAR(64) NOT NULL,
  url VARCHAR(255) NOT NULL,
  alt_text VARCHAR(180) NOT NULL,
  sort_order INT NOT NULL DEFAULT 1,
  FOREIGN KEY (component_id) REFERENCES components(id),
  INDEX idx_images_component (component_id)
);

CREATE TABLE documents (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  component_id VARCHAR(64) NOT NULL,
  doc_type ENUM('pdf', 'manual', 'certificate') NOT NULL DEFAULT 'pdf',
  title VARCHAR(180) NOT NULL,
  url VARCHAR(255) NOT NULL,
  FOREIGN KEY (component_id) REFERENCES components(id)
);

CREATE TABLE videos (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  component_id VARCHAR(64) NOT NULL,
  title VARCHAR(180) NOT NULL,
  url VARCHAR(255) NOT NULL,
  provider VARCHAR(60) NULL,
  FOREIGN KEY (component_id) REFERENCES components(id)
);

CREATE TABLE reviews (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  component_id VARCHAR(64) NOT NULL,
  author VARCHAR(120) NOT NULL,
  rating TINYINT NOT NULL,
  comment TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (component_id) REFERENCES components(id),
  INDEX idx_reviews_component (component_id)
);

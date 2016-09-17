# floorplan

- id varchar(64)
- name varchar(64)
- image_path varchar(256)

# items

- id varchar(64)
- floorplan_id varchar(64)
- report_id varchar(64)
- is_default bit
- state varchar(16)
- name varchar(64)
- description varchar(512)
- image_path varchar(256)
- severity int
- fixable bit
- x int
- y int

# reports

- id varchar(64)
- floorplan_id varchar(64)
- default_items varchar(2048)
    ids separated by ;
- custom_items varchar(2048)
    ids separated by ;
- submitted bit

# users

- username varchar(64)
- hash varchar(64)
- salt varchar(64)
- iterations int

# tokens

- username varchar(64)
- token varchar(64)
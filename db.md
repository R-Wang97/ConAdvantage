# floorplan

- id varchar(64)
- name varchar(64)
- image_path varchar(256)

# items

- id varchar(64)
- floorplan_id varchar(64)
- report_id varchar(64)
- is_default bit
- name varchar(64)
- description varchar(512)
- image_path varchar(256)
- severity int
- fixable bit

# reports

- id varchar(64)
- floorplan_id varchar(64)
- default_items varchar(2048)
    ids separated by ;
- custom_items varchar(2048)
    ids separated by ;

# users

- username varchar(64)
- password varchar(64)
    hashed
- salt varchar(64)
- iterations int
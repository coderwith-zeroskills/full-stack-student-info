#)tech used: reactJS,nodeJS and postgress
#)pstgress cred: check client file on serversde.
#)script for table:
CREATE TABLE Students ( 
    member_name VARCHAR(50), 
    member_email VARCHAR(50), 
    age INT, 
    member_parent_id INT PRIMARY KEY 
); 
CREATE TABLE marks ( 
    student_parent_id INT, 
    mark INT, 
    FOREIGN KEY (student_parent_id) REFERENCES students(member_parent_id) 
); 

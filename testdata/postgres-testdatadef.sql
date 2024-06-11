drop table if exists testdata;

create table testdata (

                          id serial not null primary key,
                          testname varchar(100) not null,
                          testnumber int not null
);

insert into testdata(testname, testnumber) values
                                               ('testone', 1),
                                               ('testtwo', 2);


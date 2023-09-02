-- delete channel which are 
-- 10 minutes old and have only 1 person in it

create
or replace function delete_old_channels () returns VOID as $$
declare
    channel_row RECORD;
begin
    FOR channel_row in select * from channels
    loop
        if channel_row.last_modified < (now() - interval '1 minutes') AND array_length(channel_row.usersInRoom, 1) <= 1 THEN
            delete from channels where id = channel_row.id;
        end if;
    end loop;
end;
$$ language PLPGSQL;


CREATE OR REPLACE FUNCTION delete_old_channels4()
RETURNS TRIGGER AS
$$
BEGIN
    IF OLD.last_modified < (now() - interval '10 minutes') AND array_length(OLD."usersInRoom", 1) <= 1 THEN
        RAISE NOTICE 'Deleting channel with ID %', OLD.id;
        RETURN OLD; -- This row will be deleted
    ELSE
        RAISE NOTICE 'Keeping channel with ID %', OLD.id;
        RETURN NULL; -- This row won't be deleted
    END IF;
END;
$$
LANGUAGE PLPGSQL;


-- every 30 minute cron
-- */30 * * * *

-- delete every 30 minute
SELECT cron.schedule(
    'delete-old-channels',
    '*/30 * * * *',
    $$
    DELETE FROM channels
        WHERE 
            last_modified < now() - INTERVAL '30 minute' 
            AND 
            ARRAY_LENGTH("usersInRoom", 1) < 2
    $$
);

-- unchedule the thingamathong
select cron.unschedule('delete-old-channels');


-- docs se uthaya
-- select cron.schedule (
--     'saturday-cleanup', -- name of the cron job
--     '30 3 * * 6', -- Saturday at 3:30am (GMT)
--     $$ delete from events where event_time < now() - interval '1 week' $$
-- );

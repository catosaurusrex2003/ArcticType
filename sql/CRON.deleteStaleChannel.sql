-- legit cron
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

-- get cron logs
-- SELECT * FROM cron.job_run_details;

-- unschedule cron
-- select cron.unschedule('delete-old-channels');

-- delete cron logs
-- DELETE FROM cron.job_run_details;
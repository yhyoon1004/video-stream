const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

// console.log(">>>",path);

// 동영상 파일 경로와 출력 디렉토리 설정
const videoFilePath = 'input/crazy_music.mp4';
const outputDir = 'output';
const outputM3U8File = path.join(outputDir, 'crazy_music.m3u8');

// ffmpeg 명령어 실행
ffmpeg(videoFilePath)
    .outputOptions([
        '-codec: copy',
        '-start_number 0',
        '-hls_time 10',
        '-hls_list_size 0',
        '-f hls'
    ])
    .output(outputM3U8File)
    .on('end', () => {
        console.log('Processing finished!');
    })
    .on('error', (err) => {
        console.error('Error: ' + err.message);
    })
    .run();

// import { FFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import {createFFmpegCore}from'@ffmpeg/core'

const ffmpeg = createFFmpegCore({ log: true });

const transcodeToHLS = async () => {
    // ffmpeg 인스턴스를 로드합니다.
    await ffmpeg.load();

    // 입력 파일을 읽어옵니다.
    ffmpeg.FS('writeFile', 'videos/crazy_music.mp4', await fetch('./videos/crazy_music.mp4'));

await ffmpeg.run(
    '-i', 'crazy_music.mp4',
    '-codec: copy',
    '-start_number', '0',
    '-hls_time', '10',
    '-hls_list_size','0',
    '-f', 'hls','crazy_music.m3u8'
);

    // 변환된 .m3u8 파일을 가져옵니다.
    const m3u8Data = ffmpeg.FS('readFile', 'output.m3u8');

    // .m3u8 파일을 Blob으로 생성하여 다운로드 링크를 만듭니다.
    const m3u8Blob = new Blob([m3u8Data.buffer], { type: 'application/vnd.apple.mpegurl' });
    const m3u8URL = URL.createObjectURL(m3u8Blob);
    console.log('M3U8 URL:', m3u8URL);

    // 변환된 .ts 파일들을 가져옵니다.
    const tsFiles = [];
    for (let i = 0; i < ffmpeg.FS('readdir', '/').length; i++) {
        const file = ffmpeg.FS('readdir', '/')[i];
        if (file.endsWith('.ts')) {
            const tsData = ffmpeg.FS('readFile', file);
            const tsBlob = new Blob([tsData.buffer], { type: 'video/mp2t' });
            const tsURL = URL.createObjectURL(tsBlob);
            tsFiles.push(tsURL);
            console.log(`TS File URL: ${tsURL}`);
        }
    }
};

// 변환 작업을 시작합니다.
transcodeToHLS().then();

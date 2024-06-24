const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// TS 파일과 M3U8 플레이리스트를 제공할 정적 디렉토리 설정
const outputDir = '';
app.use('/videos', express.static(outputDir));

// 루트 엔드포인트
app.get('/', (req, res) => {
    res.send('HLS Streaming Server');
});

// 서버 시작
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

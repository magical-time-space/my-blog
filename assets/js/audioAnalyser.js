console.log('!!!!!!!!!!!!!!JS:createAudioAnalyser');
// 音频处理
// --创建音频分析仪
const createAudioAnalyser = (audio, canvas, type='drawRect') => {
    // see: https://docs.w3cub.com/dom/web_audio_api/visualizations_with_web_audio_api.html
    console.log('~~~analyser:event', { audio,canvas,type });
    // if (!isChromeApp()) { return null; }
    // if (audio && audio?.crossOrigin != 'anonymous' ) { return null; }
    //analyser 
    // let audio = vDOM;
    // isChromeApp() && (audio.crossOrigin = 'anonymous');
    // audio.crossOrigin = '';
    let dataArray, analyser,source,audioCtx;
    // console.log('~~~analyser:event', { audio,canvas });
    //
    // videoPlayerInstance.streamController.audioOnly:true
    //
    try {
        //创建一个音频上下文实例
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        //添加一个音频源节点
        source = audioCtx.createMediaElementSource(audio);
        //分析器节点
        analyser = audioCtx.createAnalyser();
        //fft分析器  越大 分析越细
        analyser.fftSize = 256;
        console.log('~~~analyser:events', { audio,source,analyser });
        // analyser.fftSize=2048;
        //创建一个无符号字节的数组
        // dataArray=new Uint8Array( analyser.frequencyBinCount);
        // console.log('~~~analyser:dataArray',{dataArray});
        // 音频源节点 链接分析器
        source.connect(analyser)
        // 分析器链接输出设备
        analyser.connect(audioCtx.destination)
    } catch (error) {
        console.log('~~~analyser:error', error)
    }
    //
    function destroyed() {
        try { audioCtx.close().then(function() {  }); } catch (error) { }
        try {
            source.disconnet();
            analyser.disconnet();
        } catch (error) {
            
        }
    }
    //
    let canvasCtx = canvas.getContext('2d');
    // let freqByteData = new Uint8Array(analyser.frequencyBinCount); // 频域数据
    dataArray = new Uint8Array(analyser.frequencyBinCount); // 频域数据
    console.log('~~~analyser:dataArray', { dataArray, canvas });
    let [WIDTH, HEIGHT, bufferLength] = [canvas.width, canvas.height, analyser.frequencyBinCount];
    //
    const drawWaveline = () => {
        requestAnimationFrame(drawWaveline);
        analyser.getByteTimeDomainData(dataArray);
        canvasCtx.fillStyle = "#000000";
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = "#32a35e";
        canvasCtx.beginPath();
        const sliceWidth = (WIDTH * 1.0) / bufferLength;
        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = (v * HEIGHT) / 2;
            if (i === 0) {
                canvasCtx.moveTo(x, y);
            } else {
                canvasCtx.lineTo(x, y);
            }
            x += sliceWidth;
        }
        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();
    }
    //
    const drawRect = () => {
        requestAnimationFrame(drawRect);
        analyser.getByteFrequencyData(dataArray);
        canvasCtx.fillStyle = "#000000";
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
        var barWidth = (WIDTH / bufferLength) * 2.5;
        var barHeight;
        var x = 0;
        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] / 1;
            canvasCtx.fillStyle = '#FF0c0c';//'rgb(' + (barHeight+100) + ',50,50)';
            // canvasCtx.fillRect((-barHeight / 2), x, barHeight, barWidth);
            canvasCtx.fillRect(x,(HEIGHT-barHeight/2),barWidth,barHeight);
            x += barWidth + 1;
        }
    }
    //
    // Math.random()>0.45?drawRect():drawWaveline();
    //
    type=="drawRect" && drawRect();
    type=="drawWaveline" && drawWaveline();
    // drawRect();
    return {
        analyser,source,audioCtx, destroyed,type,
        draw:(type="drawRect")=>{
            type=="drawRect" && requestAnimationFrame(drawRect);
            type=="drawWaveline" && requestAnimationFrame(drawWaveline);
            return type;
        }
    };
}


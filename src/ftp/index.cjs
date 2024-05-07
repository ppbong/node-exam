const fs = require('node:fs');
const path = require('node:path');
const Client = require('ftp');

const options = {
    host: '127.0.0.1',
    port: 21,
    user: 'user01',
    password: 'user01',
}

const client = new Client();

client.on('ready', () => {
    client.list((err, list) => {
        if (err) throw err;
        console.dir(list);
    });

    client.mkdir('temp/test', true, (err) => {
        if (err) throw err;
    });

    client.rmdir('temp', true, (err) => {
        if (err) throw err;
    });

    client.get('data/xxxx.tar.gz', (err, stream) => {
        if (err) throw err;

        stream.once('close', () => {
            console.log('下载完成')
        })

        stream.pipe(fs.createWriteStream('xxxx.tar.gz'))
    })

    client.put('xxxx.tar.gz', 'yyyy.tar.gz', (err) => {
        if (err) throw err;

        console.log('上传完成')
    })

    client.end();
});

client.connect(options);
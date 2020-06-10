const m3Parser = require('m3u8-parser');

const manifest = [
    '#EXTM3U',
    '#EXT-X-VERSION:3',
    '#EXT-X-TARGETDURATION:10',
    '#EXT-X-MEDIA-SEQUENCE:555871',
    '#EXT-X-DISCONTINUITY-SEQUENCE:2',
    '#EXTINF:10,',
    'https://gencluster.g-mana.com/media/fab3b610-d2a9-449b-8e3fbd16007cd6f6/profile/0/media/AU_5daebea1-3c42-4b91-a565-,05044696c17d/segments/a34f286b-92a3-4190-9d9b-ba1c4c6b2061.ts?_uid=371e3d67-,be5a-422d-a190-4ff791c8daa2&_aunitid=b916121f-9117-4807-86ae47b2aba6336e&_adpr=50&_adtp=preroll&_adrurl=https%3A%2F%2Fdwttjeib02u5m.clo,udfront.net%2Fclive%2Fplaylist0.ts,#EXTINF:3.92,,https://gencluster.g-mana.com/media/fab3b610-d2a9-449b-8e3fbd16007cd6f6/profile/0/media/AU_5daebea1-3c42-4b91-a565-,05044696c17d/segments/20995c34-bb08-4ae3-8ba4-,d28bb9b53e32.ts?_uid=371e3d67-be5a-422d-a190-4ff791c8daa2&_aunitid=b916121f9117-4807-86ae47b2aba6336e&_adpr=100&_adtp=preroll&_adrurl=https%3A%2F%2Fdwttjeib02u5m.cl,oudfront.net%2Fclive%2Fplaylist1.ts',
    '#EXT-X-DISCONTINUITY,',
    '#EXTINF:10,',
    'https://reshet-live-il.ctedgecdn.net/13tv-desktop/r13_1200_555872.ts',
    '#EXTINF:10,'
    ,'https://reshet-live-il.ctedgecdn.net/13tv-desktop/r13_1200_555873.ts',
    '#EXTINF:10,'
    ,'https://reshet-live-il.ctedgecdn.net/13tv-desktop/r13_1200_555874.ts',
    '#EXTINF:10,'
    ,'https://reshet-live-il.ctedgecdn.net/13tv-desktop/r13_1200_555875.ts',
    '#EXT-X-DISCONTINUITY,',
    '#EXTINF:10,'
    ,'https://reshet-live-il.ctedgecdn.net/13tv-desktop/r13_1200_555876.ts',
    '#EXTINF:10,'
    ,'https://reshet-live-il.ctedgecdn.net/13tv-desktop/r13_1200_555877.ts',
    '#EXTINF:10,'
    ,'https://reshet-live-il.ctedgecdn.net/13tv-desktop/r13_1200_555878.ts',
    '#EXTINF:10,'
    ,'https://reshet-live-il.ctedgecdn.net/13tv-desktop/r13_1200_555879.ts',
    '#EXTINF:10,'
    ,'https://reshet-live-il.ctedgecdn.net/13tv-desktop/r13_1200_555880.ts',
    '#EXTINF:10,'
    ,'https://reshet-live-il.ctedgecdn.net/13tv-desktop/r13_1200_555881.ts'    
].join('\n');

var parser = new m3Parser.Parser();
   
parser.push(manifest);
parser.end();
 
var parsedManifest = parser.manifest;
// console.log(parsedManifest);
let segmentDuration = 0;    
let previous = false;
parsedManifest.segments.map((data, index)=> {
    const subSegmentLength = 30;
    if(data.discontinuity){
        if(previous){
            console.log(`END ${data.uri}: ${segmentDuration}`);
            return;
        }
       console.log(`START ${data.uri}`);
       segmentDuration += data.duration;
    }
    segmentDuration += data.duration;
    if((segmentDuration-20)==subSegmentLength){
        if(previous){ return}
        console.log(`END ${data.uri}: ${segmentDuration-20}`);
        console.log(`START ${data.uri}`);
        previous=true;
        segmentDuration = 0;
    }
});
import axios from "axios"

const BASE_URL = "https://render-api.zepeto.io/v2"

export const get_image = async (width, photoboothTitle, hashcode) => {
    const url = `${BASE_URL}/graphics/zepeto/booth/${photoboothTitle}`
    let resultUrl
    try {
        const res = await axios({
            method: 'post',
            url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "type": "booth", // booth 타입
                "width": parseInt(width), // 너비
                "target": {
                    "hashCodes": hashcode.split(',') // 해시코드
                }
            }
        });
        resultUrl = res.data.url;
    } catch (e) {
        console.log(e);
        // 요청 실패 시 공백 반환
        resultUrl = '';
    }
    return resultUrl;
}
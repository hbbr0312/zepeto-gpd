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

export const get_com_list = async () => {
    const url = 'http://52.79.151.67:3000/api/comp_list'
    let data;
    try {
        const res = await axios({
            method: 'get',
            url,
        });
        data = res.data.comps;
        for (var i in data.slice(0, 5)) {
            data[i].num_participants = Math.round(Math.random() * data[i].capacity)
            if (i <= 1) data[i].participated = true
            else data[i].participated = false
        }
    } catch (e) {
        console.log(e);
        // 요청 실패 시 공백 반환
        data = '';
    }
    return data;
}

export const make_comp = async (code, title, cover, max, booth, theme) => {
    const url = 'http://52.79.151.67:3000/api/create_comp'
    let data;
    try {
        const res = await axios({
            method: 'post',
            url,
            data: {
                "user_code": code,
                "name": title,
                "cover_image": cover,
                "capacity": max,
                "theme": [theme],
                "booth_fixed": booth != null,
                "booth": booth
            }

        });
        data = res.data
    } catch (e) {
        console.log(e);
        // 요청 실패 시 공백 반환
        data = '';
    }
    return data.result == 1;
}

import type { Question } from '../types';

export const surveyQuestions: Question[] = [
    {
        "question": "나는 수업 시간에 큰 소리로 하품하지 않는다.",
        "type": "MC",
        "options": ["전혀 아니다", "아니다", "보통이다", "그렇다", "항상 그렇다"],
        "points": [1, 2, 3, 4, 5],
        "required": true,
        "group": "수업 태도"
    },
    {
        "question": "수업 시간에 간식을 꺼내 먹는 편이다.",
        "type": "MC",
        "options": ["전혀 아니다", "아니다", "보통이다", "그렇다", "항상 그렇다"],
        "points": [5, 4, 3, 2, 1],
        "required": true,
        "group": "수업 태도"
    },
    {
        "question": "친구가 발표할 때 방해하지 않고 집중해서 듣는다.",
        "type": "MC",
        "options": ["전혀 아니다", "아니다", "보통이다", "그렇다", "항상 그렇다"],
        "points": [1, 2, 3, 4, 5],
        "required": true,
        "group": "수업 태도"
    },
    {
        "question": "수업 종이 쳐도 복도에서 계속 떠드는 편이다.",
        "type": "MC",
        "options": ["전혀 아니다", "아니다", "보통이다", "그렇다", "항상 그렇다"],
        "points": [5, 4, 3, 2, 1],
        "required": true,
        "group": "수업 태도"
    },
    {
        "question": "수업 시작할 때 꼭 화장실을 가거나 물을 뜨러 간다고 말한다.",
        "type": "MC",
        "options": ["전혀 아니다", "아니다", "보통이다", "그렇다", "항상 그렇다"],
        "points": [5, 4, 3, 2, 1],
        "required": true,
        "group": "수업 태도"
    },
    {
        "question": "선생님께 질문할 때는 손을 들고 허락을 받고 말한다.",
        "type": "MC",
        "options": ["전혀 아니다", "아니다", "보통이다", "그렇다", "항상 그렇다"],
        "points": [1, 2, 3, 4, 5],
        "required": true,
        "group": "수업 태도"
    },
    {
        "question": "수업 중 필요 없는 잡담을 자주 한다.",
        "type": "MC",
        "options": ["전혀 아니다", "아니다", "보통이다", "그렇다", "항상 그렇다"],
        "points": [5, 4, 3, 2, 1],
        "required": true,
        "group": "수업 태도"
    },
    {
        "question": "교무실 문을 열기 전, 항상 노크를 하고 허락을 받는다.",
        "type": "MC",
        "options": ["전혀 아니다", "아니다", "보통이다", "그렇다", "항상 그렇다"],
        "points": [1, 2, 3, 4, 5],
        "required": true,
        "group": "공용공간"
    },
    {
        "question": "교무실 정수기나 종이컵을 허락 없이 사용해도 괜찮다고 생각한다.",
        "type": "MC",
        "options": ["전혀 아니다", "아니다", "보통이다", "그렇다", "항상 그렇다"],
        "points": [5, 4, 3, 2, 1],
        "required": true,
        "group": "공용공간"
    },
    {
        "question": "교사나 다른 선생님을 만날 때 인사를 잘하는 편이다.",
        "type": "MC",
        "options": ["전혀 아니다", "아니다", "보통이다", "그렇다", "항상 그렇다"],
        "points": [1, 2, 3, 4, 5],
        "required": true,
        "group": "공용공간"
    },
    {
        "question": "쓰레기를 복도나 교실에 그냥 버리는 편이다.",
        "type": "MC",
        "options": ["전혀 아니다", "아니다", "보통이다", "그렇다", "항상 그렇다"],
        "points": [5, 4, 3, 2, 1],
        "required": true,
        "group": "공용공간"
    },
    {
        "question": "화장실을 사용한 후 뒷정리를 깔끔하게 하는 편이다.",
        "type": "MC",
        "options": ["전혀 아니다", "아니다", "보통이다", "그렇다", "항상 그렇다"],
        "points": [1, 2, 3, 4, 5],
        "required": true,
        "group": "공용공간"
    },
    {
        "question": "복도나 공용공간에서 큰 소리를 자주 내는 편이다.",
        "type": "MC",
        "options": ["전혀 아니다", "아니다", "보통이다", "그렇다", "항상 그렇다"],
        "points": [5, 4, 3, 2, 1],
        "required": true,
        "group": "공용공간"
    },
    {
        "question": "친구의 부모님 이름이나 여자친구 이름을 부르며 놀린 적이 있다.",
        "type": "MC",
        "options": ["전혀 아니다", "아니다", "보통이다", "그렇다", "항상 그렇다"],
        "points": [5, 4, 3, 2, 1],
        "required": true,
        "group": "존중"
    },
    {
        "question": "친구가 싫어하는 별명이나 말은 하지 않으려고 노력한다.",
        "type": "MC",
        "options": ["전혀 아니다", "아니다", "보통이다", "그렇다", "항상 그렇다"],
        "points": [1, 2, 3, 4, 5],
        "required": true,
        "group": "존중"
    },
    {
        "question": "친구들과 대화할 때 욕설이나 비속어를 잘 쓰지 않는다.",
        "type": "MC",
        "options": ["전혀 아니다", "아니다", "보통이다", "그렇다", "항상 그렇다"],
        "points": [1, 2, 3, 4, 5],
        "required": true,
        "group": "존중"
    },
    {
        "question": "교사에게 짜증 섞인 말투를 쓰는 편이다.",
        "type": "MC",
        "options": ["전혀 아니다", "아니다", "보통이다", "그렇다", "항상 그렇다"],
        "points": [5, 4, 3, 2, 1],
        "required": true,
        "group": "존중"
    },
    {
        "question": "친구가 기분 나빠하는 행동을 일부러 한 적이 있다.",
        "type": "MC",
        "options": ["전혀 아니다", "아니다", "보통이다", "그렇다", "항상 그렇다"],
        "points": [5, 4, 3, 2, 1],
        "required": true,
        "group": "존중"
    },
    {
        "question": "[상황] 수업 중 친구가 과자를 꺼냈다. 이때 나는…",
        "type": "SC",
        "options": ["나도 같이 먹는다", "못 본 척한다", "친구에게 \"수업 중이야\"라고 조용히 말한다", "선생님께 알려서 멈추게 한다"],
        "points": [1, 2, 5, 4],
        "required": true,
        "group": "상황형"
    },
    {
        "question": "[상황] 교무실에 선생님을 찾으러 갔다. 이때 나는…",
        "type": "SC",
        "options": ["바로 문을 열고 들어간다", "노크는 하지만 기다리지 않는다", "노크 후 \"들어오세요\"를 기다린다", "다른 선생님께 허락을 받고 들어간다"],
        "points": [1, 2, 5, 4],
        "required": true,
        "group": "상황형"
    },
    {
        "question": "[상황] 복도에 쓰레기가 떨어져 있다면 나는…",
        "type": "SC",
        "options": ["그냥 지나친다", "발로 한쪽으로 밀어둔다", "쓰레기를 주워 쓰레기통에 버린다", "친구에게 대신 버려달라고 부탁한다"],
        "points": [1, 2, 5, 3],
        "required": true,
        "group": "상황형"
    },
    {
        "question": "[상황] 수업 시작 5분 전에 교실에서 친구들과 놀고 있다면 나는…",
        "type": "SC",
        "options": ["계속 논다", "교실에서 떠들지만 자리에 앉아있다", "스스로 자리에 앉아 수업 준비를 한다"],
        "points": [1, 3, 5],
        "required": true,
        "group": "상황형"
    }
];

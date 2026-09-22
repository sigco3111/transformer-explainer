# 🧠 트랜스포머 익스플레이너 — Transformer Explainer (한글판)

<p align="center">
  <img width="900" alt="트랜스포머 익스플레이너 한글판 미리보기" src="static/preview/teaser.png">
</p>

> GPT-2 모델을 브라우저에서 직접 실행하며, 트랜스포머가 한 단어씩 다음 단어를 예측하는 과정을 인터랙티브하게 시각화한 학습 도구입니다.
>
> 본 저장소는 [poloclub/transformer-explainer](https://github.com/poloclub/transformer-explainer)의 한글화 미러입니다.

[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![arxiv badge](https://img.shields.io/badge/arXiv-2408.04619-red)](https://arxiv.org/abs/2408.04619)

**[🌐 라이브 데모 — https://sigco3111.github.io/transformer-explainer/](https://sigco3111.github.io/transformer-explainer/)**

---

## 📖 소개

**트랜스포머 익스플레이너**는 최신 AI 모델의 핵심 아키텍처인 **트랜스포머(Transformer)**의 내부 동작을 직관적으로 이해할 수 있도록 설계된 인터랙티브 시각화 도구입니다.

단순한 다이어그램과 다르게, 이 도구는 **실제 GPT-2(small) 모델 가중치를 그대로 브라우저로 가져와** 사용자가 입력한 텍스트에 대해 한 토큰씩 다음 단어를 생성하는 전 과정을 시각화합니다.

- **실제 모델 실행** — 사전 학습된 GPT-2(small) ONNX 모델이 그대로 브라우저에서 실행됩니다.
- **인터랙티브 시각화** — 어텐션, MLP, 토큰 임베딩, 소프트맥스 등 모델 내부의 모든 단계를 마우스로 직접 탐색할 수 있습니다.
- **교과서(Textbook)** — 우측 사이드바가 각 구성 요소를 차근차근 설명해, 머신러닝 배경지식이 없어도 학습할 수 있습니다.
- **직접 실험** — 예시 문장 외에 사용자 자신의 한국어/영어 문장을 입력해 모델이 어떤 단어를 예측하는지 확인할 수 있습니다.
- **모든 UI 한글화** — 예시 문장, 팝오버, 슬라이더, 알림, 교과서 본문까지 한국어로 제공합니다.

## 🚀 빠른 시작

### 라이브 데모 사용 (권장)

별도 설치 없이 바로 사용할 수 있습니다.

👉 **https://sigco3111.github.io/transformer-explainer/**

1. 페이지가 로드되면 자동으로 GPT-2 모델(약 130MB, 분할 전송)을 다운로드합니다.
2. 좌측 상단의 **예시** 버튼을 눌러 예시 문장을 선택하거나, 직접 입력창에 한국어/영어 텍스트를 입력하세요.
3. **생성** 버튼을 클릭하면 모델이 다음 토큰을 예측하는 과정을 인터랙티브하게 시각화합니다.
4. 화면 오른쪽의 **교과서** 카드에서 각 구성 요소를 차근차근 설명해 줍니다.
5. 시각화 영역의 모든 글자/도형 위에 마우스를 올리면 상세 설명 팝오버가 나타납니다.
6. 하단의 **온도(temperature)** 슬라이더와 **샘플링(Sampling)** 슬라이더로 모델의 창의성을 조절해 보세요.

### 로컬에서 실행

#### 사전 요구사항

- Node.js v20 이상
- npm v10 이상
- 디스크 여유 공간 약 1GB (모델 626MB + node_modules)

#### 설치 및 실행

```bash
# 1) 저장소 클론 (sparse-clone으로 빠르게)
git clone --filter=blob:none --sparse https://github.com/sigco3111/transformer-explainer.git
cd transformer-explainer

# 2) 의존성 설치
npm install

# 3) 개발 서버 실행
npm run dev
# → http://localhost:5173/transformer-explainer/
```

> 💡 **모델 파일 처리**: 기본 브랜치(`main`)는 모델(626MB)을 포함하지 않습니다. 라이브 데모는 별도 브랜치(`models-branch`)에서 모델을 직접 다운로드합니다. 로컬 실행 시 모델이 필요하다면 다음 명령으로 받으세요:
>
> ```bash
> git remote add upstream https://github.com/poloclub/transformer-explainer.git
> git fetch upstream main
> git checkout upstream/main -- 'static/model-v2/*.part*'
> ```

#### 프로덕션 빌드

```bash
npm run build
npm run preview   # 빌드 결과 미리보기
```

빌드 산출물은 `build/` 디렉터리에 생성되며, SvelteKit의 `adapter-static` 설정으로 완전히 정적인 HTML/JS/CSS 번들이 만들어집니다.

## 🏗️ 프로젝트 구조

```
transformer-explainer/
├── src/
│   ├── components/
│   │   ├── article/            # 메인 아티클 본문 (한글)
│   │   ├── textbook/           # 우측 사이드 교과서 (한글)
│   │   ├── Popovers/           # 가중치·어텐션·MLP·활성화·정규화 등 학습 팝오버
│   │   ├── common/             # 슬라이더, 툴팁, 로딩 도트 등 공용 UI
│   │   ├── Attention.svelte    # 멀티 헤드 셀프 어텐션 시각화
│   │   ├── Mlp.svelte          # MLP 시각화
│   │   ├── QKV.svelte          # 쿼리·키·밸류 시각화
│   │   ├── LinearSoftmax.svelte # 출력 투영과 소프트맥스
│   │   ├── Embedding.svelte    # 토큰화 + 위치 인코딩
│   │   ├── Header.svelte       # 상단 헤더
│   │   ├── InputForm.svelte    # 입력 폼 + 예시
│   │   ├── Topbar.svelte       # 상단 네비
│   │   └── ...
│   ├── routes/
│   │   ├── +page.svelte        # 메인 진입점 (모델 fetch 포함)
│   │   └── +layout.svelte      # 레이아웃
│   ├── store/                  # Svelte 스토어 (모델 상태, 입력 텍스트 등)
│   ├── utils/                  # fetchChunks, 데이터 처리, 텍스트북 헬퍼
│   │   └── textbookPages.ts    # 21개 교과서 페이지 (한글 본문)
│   ├── constants/examples/     # 미리 캐시된 5개 예시 데이터
│   └── app.html                # <html lang="ko">
├── static/
│   ├── model-v2/               # (배포 시 비어 있음) GPT-2 ONNX 63 chunks
│   ├── preview/                # README 미리보기 이미지
│   ├── article_assets/         # 아티클 본문용 SVG 등
│   └── favicon.png
├── .github/workflows/          # GitHub Pages 배포 워크플로우
├── svelte.config.js            # base path = '/transformer-explainer'
├── vite.config.ts
└── package.json
```

## 🛠️ 기술 스택

- **프론트엔드**: [SvelteKit](https://kit.svelte.dev/) + TypeScript
- **빌드/번들러**: [Vite](https://vitejs.dev/)
- **배포**: GitHub Pages (정적 빌드, `adapter-static`)
- **모델 런타임**: [ONNX Runtime Web](https://onnxruntime.ai/) — 브라우저 내 GPT-2 실행
- **토크나이저**: [@xenova/transformers](https://huggingface.co/docs/transformers.js/index) (Hugging Face Transformers.js)
- **시각화**: D3.js
- **스타일**: Tailwind CSS + Flowbite Svelte + SCSS
- **수식 렌더링**: KaTeX

## 🌐 배포 구조

GitHub Pages의 한도(저장소 1GB / 빌드 아티팩트 1GB)를 고려해 **모델을 분리 배포**합니다.

| 자산 | 위치 | 용량 |
|------|------|------|
| 앱 코드 (SvelteKit 빌드 산출물) | `gh-pages` 브랜치 (GitHub Pages 호스팅) | ~수 MB |
| GPT-2 ONNX 모델 (63 chunks, 각 10MB) | `models-branch` 브랜치 (raw.githubusercontent.com CDN) | 626MB |

브라우저는 모델을 다운로드할 때 `models-branch`의 raw URL을 직접 fetch합니다:

```
https://raw.githubusercontent.com/sigco3111/transformer-explainer/models-branch/static/model-v2/gpt2.onnx.part0
...part1 ...part2 ...part62
```

**Cache API로 한 번 받은 모델은 브라우저에 캐시되어 재방문 시 즉시 로드됩니다.**

## 📝 한/영 주요 용어 대응

| 영문 | 한글 |
|------|------|
| Transformer Explainer | 트랜스포머 익스플레이너 |
| Embedding | 임베딩 |
| Tokenization | 토큰화 |
| Token Embedding | 토큰 임베딩 |
| Positional Encoding | 위치 인코딩 |
| Self-Attention | 셀프 어텐션 |
| Multi-head Self-Attention | 멀티 헤드 셀프 어텐션 |
| Query / Key / Value | 쿼리 / 키 / 밸류 |
| MLP (Expansion / Compression) | MLP (확장 / 압축) |
| Logits | 로짓 |
| Softmax | 소프트맥스 |
| Temperature | 온도(temperature) |
| Top-k / Top-p | Top-k / Top-p (필터링) |
| Sampling | 샘플링 |
| Residual Connection | 잔차 연결 |
| Layer Normalization | 층 정규화 |
| Dropout | 드롭아웃 |
| Transformer Block | 트랜스포머 블록 |
| Examples | 예시 |
| Generate | 생성 |
| Read more | 자세히 보기 |
| Open Textbook | 교과서 열기 |

## 🧪 빌드 검증

이 저장소를 빌드/테스트하려면:

```bash
npm install
npm run check    # 타입 검사 (svelte-check)
npm run build    # 프로덕션 빌드
```

빌드 산출물은 `build/`에 생성되며, GitHub Pages에 그대로 배포 가능합니다.

## 🙏 원본 및 인용

본 프로젝트는 Georgia Tech **Polo Club of Data Science**에서 만든 [poloclub/transformer-explainer](https://github.com/poloclub/transformer-explainer)의 한글화 버전입니다. 원본은 다음 논문/사이트를 기반으로 합니다:

> **Transformer Explainer: Interactive Learning of Text-Generative Models for Humans without Machine Learning Expertise**
> Aeree Cho, Grace C. Kim, Alexander Karpekov, Alec Helbling, Zijie J. Wang, Sungroh Yoon, Duen Horng (Polo) Chau
> _Proceedings of the 2024 CHI Conference on Human Factors in Computing Systems_, 2024.
> [Paper](https://arxiv.org/abs/2403.01495) · [원본 데모](https://poloclub.github.io/transformer-explainer/)

최신 인용:

```bibTeX
@inproceedings{cho2026transformer,
  title={Transformer Explainer: Learning LLM Transformers with Interactive Visual Explanation and Experimentation},
  author={Cho, Aeree and Kim, Grace C and Karpekov, Alexander and Lee, Seongmin and Helbling, Alec and Hoover, Benjamin and Wang, Zijie J and Kahng, Minsuk and Chau, Duen Horng},
  booktitle={Proceedings of the 2026 CHI Conference on Human Factors in Computing Systems},
  pages={1--21},
  year={2026}
}
```

## 📄 라이선스

원본 저장소와 동일한 [MIT License](LICENSE)를 따릅니다.

## 💡 Polo Club의 다른 익스플레이너도 확인해 보세요

- [**Diffusion Explainer**](https://poloclub.github.io/diffusion-explainer) — Stable Diffusion이 텍스트 프롬프트를 이미지로 바꾸는 과정 학습
- [**CNN Explainer**](https://poloclub.github.io/cnn-explainer) — 합성곱 신경망 학습
- [**GAN Lab**](https://poloclub.github.io/ganlab) — 브라우저에서 생성적 적대 신경망 직접 체험

---

<p align="center">
  한/영 모두 지원 · Open Source · MIT License
  <br/>
  Made with ❤️ by <a href="https://github.com/sigco3111">sigco3111</a> · 원작: <a href="https://github.com/poloclub">Georgia Tech Polo Club</a>
</p>

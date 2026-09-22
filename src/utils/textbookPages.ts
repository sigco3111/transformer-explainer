import { get } from 'svelte/store';
import {
	expandedBlock,
	weightPopover,
	isBoundingBoxActive,
	textbookCurrentPageId,
	isExpandOrCollapseRunning,
	isFetchingModel,
	userId
} from '~/store';
import {
	highlightElements,
	removeHighlightFromElements,
	applyTransformerBoundingHeight,
	resetElementsHeight,
	highlightAttentionPath,
	removeAttentionPathHighlight,
	removeFingerFromElements
} from '~/utils/textbook';
import { drawResidualLine } from './animation';

export interface TextbookPage {
	id: string;
	title: string;
	content?: string;
	component?: any;
	timeoutId?: number;
	on: () => void;
	out: () => void;
	complete?: () => void;
}

const { drawLine, removeLine } = drawResidualLine();

export const textPages: TextbookPage[] = [
	{
		id: 'what-is-transformer',
		title: '트랜스포머란 무엇인가?',
		content: `<p><strong>트랜스포머</strong>는 ChatGPT, Gemini 같은 최신 AI 모델을 작동시키는 핵심 아키텍처입니다. 2017년에 처음 소개되어 AI가 정보를 처리하는 방식을 근본적으로 바꿔 놓았습니다. 대규모 데이터셋 학습과 추론(결과 생성) 모두에 동일한 아키텍처가 사용됩니다. 여기서는 최신 모델보다 단순하지만 기본 개념을 익히기에 완벽한 GPT-2(small)를 사용합니다.</p>
`,
		on: () => {},
		out: () => {}
	},
	{
		id: 'how-transformers-work',
		title: '트랜스포머는 어떻게 동작하나?',
		content: `<p>트랜스포머는 마법처럼 동작하지 않습니다. 텍스트를 한 단계씩 만들어 가며 다음 질문을 스스로에게 던집니다.</p>
	<blockquote class="question">
		"이 입력 뒤에 가장 가능성 높은 다음 단어는 무엇인가?"
	</blockquote>
	<p>여기서는 학습된 모델이 텍스트를 어떻게 생성하는지 살펴봅니다. 직접 텍스트를 입력하거나 예시를 사용한 뒤 <strong>생성</strong> 버튼을 눌러 동작을 확인해 보세요. 모델이 아직 준비되지 않았다면 <strong>예시</strong>로 먼저 시도해 보세요.</p>`,
		on: () => {
			highlightElements(['.input-form']);
			if (get(isFetchingModel)) {
				highlightElements(['.input-form .select-button']);
			} else {
				highlightElements(['.input-form .generate-button']);
			}
		},
		out: () => {
			removeHighlightFromElements([
				'.input-form',
				'.input-form .select-button',
				'.input-form .generate-button'
			]);
		},
		complete: () => {
			removeFingerFromElements(['.input-form .select-button', '.input-form .generate-button']);
			if (get(textbookCurrentPageId) === 'how-transformers-work') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'how-transformers-work'
				});
			}
		}
	},
	{
		id: 'transformer-architecture',
		title: '트랜스포머 아키텍처',
		content:
			'<p>트랜스포머에는 세 가지 주요 부분이 있습니다.</p><div class="numbered-list"><div class="numbered-item"><span class="number-circle">1</span><div class="item-content"><strong>임베딩</strong>은 텍스트를 숫자로 변환합니다.</div></div><div class="numbered-item"><span class="number-circle">2</span><div class="item-content"><strong>트랜스포머 블록</strong>은 셀프 어텐션으로 토큰 간 정보를 섞고 MLP로 각 토큰의 표현을 정교하게 다듬습니다.</div></div><div class="numbered-item"><span class="number-circle">3</span><div class="item-content"><strong>확률</strong>은 각 다음 토큰의 가능성을 결정합니다.</div></div></div>',
		on: () => {
			const selectors = [
				'.step.embedding',
				'.step.softmax',
				'.transformer-bounding',
				'.transformer-bounding-title'
			];
			highlightElements(selectors);
			applyTransformerBoundingHeight(['.softmax-bounding', '.embedding-bounding']);
		},
		out: () => {
			const selectors = [
				'.step.embedding',
				'.step.softmax',
				'.transformer-bounding',
				'.transformer-bounding-title'
			];
			removeHighlightFromElements(selectors);
			resetElementsHeight(['.softmax-bounding', '.embedding-bounding']);
		}
	},
	{
		id: 'embedding',
		title: '임베딩(Embedding)',
		content: `<p>트랜스포머가 텍스트를 사용하려면 먼저 텍스트를 작은 단위로 나누고 각 단위를 숫자 리스트(벡터)로 표현해야 합니다. 이 과정을 <strong>임베딩</strong>이라 부르며, "임베딩"이라는 단어는 그 과정 자체와 그 결과인 벡터를 모두 가리킵니다.</p><p>이 도구에서 각 벡터는 직사각형으로 표시되며, 그 위에 마우스를 올리면 크기를 확인할 수 있습니다.</p>`,
		on: () => {
			highlightElements(['.step.embedding .title']);
		},
		out: () => {
			removeHighlightFromElements(['.step.embedding .title']);
		},
		complete: () => {
			removeFingerFromElements(['.step.embedding .title']);
			if (get(textbookCurrentPageId) === 'embedding') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'embedding'
				});
			}
		}
	},
	{
		id: 'token-embedding',
		title: '토큰 임베딩(Token Embedding)',
		content: `<p><strong>토큰화(Tokenization)</strong>는 입력 텍스트를 토큰 — 단어 또는 단어의 일부와 같은 작은 단위 — 로 분할합니다. GPT-2(small)에는 50,257개의 토큰 어휘가 있으며, 각 토큰은 고유한 ID를 갖습니다.</p><p><strong>토큰 임베딩</strong> 단계에서는 모든 토큰이 학습된 큰 룩업 테이블로부터 768개의 숫자로 구성된 벡터로 매핑됩니다. 이 벡터들은 학습 과정에서 각 토큰의 의미를 가장 잘 표현하도록 학습됩니다.</p>`,
		on: function () {
			const selectors = [
				'.token-column .column.token-string',
				'.token-column .column.token-embedding'
			];
			if (get(expandedBlock).id !== 'embedding') {
				expandedBlock.set({ id: 'embedding' });
				this.timeoutId = setTimeout(() => {
					highlightElements(selectors);
				}, 500);
			} else {
				highlightElements(selectors);
			}
		},
		out: function () {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
				this.timeoutId = undefined;
			}
			const selectors = [
				'.token-column .column.token-string',
				'.token-column .column.token-embedding'
			];
			removeHighlightFromElements(selectors);
			if (get(textbookCurrentPageId) !== 'positional-encoding') expandedBlock.set({ id: null });
		}
	},
	{
		id: 'positional-encoding',
		title: '위치 인코딩(Positional Encoding)',
		content: `<p>언어에서는 단어의 순서가 중요합니다. <strong>위치 인코딩</strong>은 각 토큰에게 시퀀스 내 자신의 위치에 대한 정보를 부여합니다.</p><p>GPT-2는 학습된 위치 임베딩을 토큰 임베딩에 더하는 방식을 사용하지만, 더 최신 모델들은 특정 벡터를 회전시키는 RoPE 같은 다른 방식을 사용하기도 합니다. 모든 방법의 목표는 모델이 텍스트의 순서를 이해하도록 돕는 것입니다.</p>`,
		on: function () {
			const selectors = [
				'.token-column .column.position-embedding',
				'.token-column .column.symbol'
			];
			if (get(expandedBlock).id !== 'embedding') {
				expandedBlock.set({ id: 'embedding' });
				this.timeoutId = setTimeout(() => {
					highlightElements(selectors);
				}, 500);
			} else {
				highlightElements(selectors);
			}
		},
		out: function () {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
				this.timeoutId = undefined;
			}
			const selectors = [
				'.token-column .column.position-embedding',
				'.token-column .column.symbol'
			];
			removeHighlightFromElements(selectors);
			if (get(textbookCurrentPageId) !== 'token-embedding') expandedBlock.set({ id: null });
		}
	},
	{
		id: 'blocks',
		title: '반복되는 트랜스포머 블록',
		content: `<p><strong>트랜스포머 블록</strong>은 모델에서 실제 처리를 담당하는 핵심 단위이며, 두 부분으로 구성됩니다.</p><ul><li><strong>멀티 헤드 셀프 어텐션</strong> — 토큰들이 정보를 공유할 수 있게 합니다</li><li><strong>MLP</strong> — 각 토큰의 세부 표현을 정교하게 다듬습니다</li></ul><p>모델은 이러한 블록을 여러 개 쌓아, 토큰 표현이 블록을 거치며 점점 풍부해지도록 합니다. GPT-2(small)는 12개의 블록을 가지고 있습니다.</p>`,
		on: function () {
			this.timeoutId = setTimeout(
				() => {
					highlightElements([
						'.transformer-bounding',
						'.step.transformer-blocks .guide',
						'.attention > .title',
						'.mlp > .title'
					]);
					highlightElements(['.transformer-bounding-title'], 'textbook-button-highlight');
					isBoundingBoxActive.set(true);
				},
				get(isExpandOrCollapseRunning) ? 500 : 0
			);
		},
		out: function () {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
				this.timeoutId = undefined;
			}
			removeHighlightFromElements([
				'.transformer-bounding',
				'.step.transformer-blocks .guide',
				'.attention > .title',
				'.mlp > .title'
			]);
			removeHighlightFromElements(['.transformer-bounding-title'], 'textbook-button-highlight');
			isBoundingBoxActive.set(false);
		},
		complete: () => {
			removeFingerFromElements(['.transformer-bounding-title']);
			if (get(textbookCurrentPageId) === 'blocks') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'blocks'
				});
			}
		}
	},
	{
		id: 'self-attention',
		title: '멀티 헤드 셀프 어텐션',
		content:
			'<p><strong>셀프 어텐션</strong>은 모델이 입력의 어떤 부분이 각 토큰과 가장 관련이 깊은지를 스스로 결정하도록 합니다. 이를 통해 멀리 떨어진 단어 사이에서도 의미와 관계를 파악할 수 있습니다.</p><p><strong>멀티 헤드</strong> 방식에서는 여러 어텐션 과정을 병렬로 실행하여, 각각이 텍스트의 서로 다른 패턴에 집중합니다.</p>',
		on: () => {
			highlightElements(['.step.attention']);
		},
		out: () => {
			removeHighlightFromElements(['.step.attention']);
		}
	},
	{
		id: 'qkv',
		title: '쿼리, 키, 밸류',
		content: `
<p>셀프 어텐션을 수행하려면 각 토큰의 임베딩이
  <span class="highlight">세 개의 새로운 임베딩</span>으로 변환됩니다 —
  <span class="blue">쿼리(Query)</span>,
  <span class="red">키(Key)</span>, 그리고
  <span class="green">밸류(Value)</span>.
  이 변환은 각 토큰 임베딩에 서로 다른 가중치와 편향을 적용하는 방식으로 이루어집니다. 이 파라미터(가중치와 편향)는 학습 과정에서 최적화됩니다.</p>

<p>일단 만들어지면 <span class="blue">쿼리</span>는 <span class="red">키</span>와 비교되어 관련도를 측정하고, 이 관련도는 <span class="green">밸류</span>에 가중치를 부여하는 데 사용됩니다.</p>
`,
		on: function () {
			this.timeoutId = setTimeout(
				() => {
					highlightElements(['g.path-group.qkv', '.step.qkv .qkv-column']);
				},
				get(isExpandOrCollapseRunning) ? 500 : 0
			);
		},
		out: function () {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
				this.timeoutId = undefined;
			}
			removeHighlightFromElements(['g.path-group.qkv', '.step.qkv .qkv-column']);
			weightPopover.set(null);
		},
		complete: () => {
			removeFingerFromElements(['.step.qkv .qkv-column']);
			if (get(textbookCurrentPageId) === 'qkv') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'qkv'
				});
			}
		}
	},

	{
		id: 'multi-head',
		title: '멀티 헤드',
		content:
			'<p><span class="blue">Q</span>, <span class="red">K</span>, <span class="green">V</span> 임베딩을 만든 뒤, 모델은 이를 여러 <strong>헤드</strong>(GPT-2 small의 경우 12개)로 분할합니다. 각 헤드는 더 작은 <span class="blue">Q</span>/<span class="red">K</span>/<span class="green">V</span> 집합을 독립적으로 다루며, 문법, 의미, 장거리 연결 등 서로 다른 패턴에 집중합니다.</p><p>여러 헤드를 두면 모델이 다양한 종류의 관계를 병렬로 학습할 수 있어, 이해력이 훨씬 풍부해집니다.</p>',
		on: () => {
			highlightAttentionPath();
			highlightElements(['.multi-head .head-title']);
		},
		out: () => {
			removeAttentionPathHighlight();
			removeHighlightFromElements(['.multi-head .head-title']);
		},
		complete: () => {
			removeFingerFromElements(['.multi-head .head-title']);
			if (get(textbookCurrentPageId) === 'multi-head') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'multi-head'
				});
			}
		}
	},
	{
		id: 'masked-self-attention',
		title: '마스크드 셀프 어텐션',
		content: `<p>각 헤드 안에서 모델은 각 토큰이 다른 토큰에 얼마나 집중할지를 결정합니다.</p><ul><li><strong>내적</strong> — <span class="blue">쿼리</span>/<span class="red">키</span> 벡터에서 대응하는 숫자를 곱하고 합산해 <span class="purple">어텐션 점수</span>를 얻습니다.</li><li><strong>마스크</strong> — 미래 토큰을 가려 모델이 미리 엿볼 수 없도록 합니다.</li><li><strong>소프트맥스</strong> — 점수를 확률로 변환하며, 각 행의 합은 1이 되고 앞쪽 토큰들에 대한 집중도를 보여 줍니다.</li></ul>`,
		on: () => {
			highlightAttentionPath();
			highlightElements(['.attention-matrix.attention-result']);
		},
		out: () => {
			removeAttentionPathHighlight();
			removeHighlightFromElements(['.attention-matrix.attention-result']);
			expandedBlock.set({ id: null });
		},
		complete: () => {
			removeFingerFromElements(['.attention-matrix.attention-result']);
			if (get(textbookCurrentPageId) === 'masked-self-attention') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'masked-self-attention'
				});
			}
		}
	},
	{
		id: 'output-concatenation',
		title: '어텐션 출력과 연결(Concatenation)',
		content:
			'<p>각 헤드는 자신의 <span class="purple">어텐션 점수</span>와 <span class="green">밸류</span> 임베딩을 곱해 어텐션 출력을 만듭니다 — 문맥을 고려한 각 토큰의 정제된 표현입니다.</p><p>GPT-2(small)는 이러한 출력을 12개 가지고 있으며, 이를 연결(concatenate)해 원래 크기(768개 숫자)의 단일 벡터로 만듭니다.</p>',
		on: function () {
			this.timeoutId = setTimeout(
				() => {
					highlightElements(['path.to-attention-out.value-to-out', '.attention .column.out']);
				},
				get(isExpandOrCollapseRunning) ? 500 : 0
			);
		},
		out: function () {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
				this.timeoutId = undefined;
			}
			removeHighlightFromElements(['path.to-attention-out.value-to-out', '.attention .column.out']);
			weightPopover.set(null);
		},
		complete: () => {
			removeFingerFromElements(['.attention .column.out']);
			if (get(textbookCurrentPageId) === 'output-concatenation') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'output-concatenation'
				});
			}
		}
	},
	{
		id: 'mlp',
		title: 'MLP(다층 퍼셉트론)',
		content:
			'<p>어텐션 출력은 <strong>MLP</strong>를 통과해 각 토큰의 표현이 한 번 더 정교해집니다. 선형 계층이 임베딩의 값과 크기를 학습된 가중치와 편향으로 바꾸고, 그 뒤 비선형 활성화 함수가 각 값을 얼마나 통과시킬지를 결정합니다.</p><p>활성화 함수에는 여러 종류가 있으며, GPT-2는 <strong>GELU</strong>를 사용합니다. GELU는 작은 값도 부분적으로 통과시키고 큰 값은 완전히 통과시켜, 미묘한 패턴과 강한 패턴을 모두 잡아냅니다.</p>',
		on: () => {
			highlightElements(['.step.mlp', '.operation-col.activation']);
		},
		out: () => {
			removeHighlightFromElements(['.step.mlp', '.operation-col.activation']);
		}
	},

	{
		id: 'output-logit',
		title: '출력 로짓(Output Logit)',
		content: `<p>모든 트랜스포머 블록을 통과한 후, 마지막 토큰의 출력 임베딩은 앞선 모든 토큰의 문맥 정보를 담아 풍부해집니다. 이 임베딩은 마지막 계층에서 학습된 가중치와 곱해집니다.</p><p>그 결과로 <strong>로짓</strong>이 만들어지며, GPT-2 어휘의 각 토큰마다 하나씩, 총 50,257개의 숫자가 생성되어 각 토큰이 다음에 올 가능성을 나타냅니다.</p>`,
		on: () => {
			highlightElements(['g.path-group.softmax', '.column.final']);
		},
		out: () => {
			removeHighlightFromElements(['g.path-group.softmax', '.column.final']);
			weightPopover.set(null);
		},
		complete: () => {
			removeFingerFromElements(['.column.final']);
			if (get(textbookCurrentPageId) === 'output-logit') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'output-logit'
				});
			}
		}
	},
	{
		id: 'output-probabilities',
		title: '확률(Probabilities)',
		content:
			'<p>로짓은 그저 원시 점수입니다. 이를 해석하기 쉽게 만들기 위해 0과 1 사이의 <strong>확률</strong>로 변환하며, 모든 확률의 합은 1이 됩니다. 이렇게 하면 각 토큰이 다음 단어가 될 가능성을 알 수 있습니다.</p><p>항상 가장 확률이 높은 토큰만 고르지 않고, 다양한 선택 전략을 사용해 생성 텍스트의 안정성과 창의성 사이의 균형을 조절할 수 있습니다.</p>',
		on: () => {
			highlightElements(['.step.softmax .title']);
		},
		out: () => {
			removeHighlightFromElements(['.step.softmax .title']);
		},
		complete: () => {
			removeFingerFromElements(['.step.softmax .title']);
			if (get(textbookCurrentPageId) === 'output-probabilities') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'output-probabilities'
				});
			}
		}
	},
	{
		id: 'temperature',
		title: '온도(Temperature)',
		content:
			'<p><strong>온도(temperature)</strong>는 로짓이 확률로 변환되기 전에 그것을 스케일링합니다. <strong>낮은 온도</strong>(예: 0.2)는 큰 로짓은 더 크게, 작은 로짓은 더 작게 만들어 가장 점수가 높은 토큰을 선호하게 되며 결과적으로 <strong>예측 가능한 출력</strong>을 만듭니다. <strong>높은 온도</strong>(예: 1.0 이상)는 차이를 평평하게 만들어 가능성이 낮은 토큰도 경쟁에 참여하게 되며, 그 결과 <strong>창의적인 출력</strong>이 만들어집니다.</p>',
		on: function () {
			if (get(expandedBlock).id !== 'softmax') {
				expandedBlock.set({ id: 'softmax' });
				this.timeoutId = setTimeout(() => {
					highlightElements([
						'.formula-step.scaled',
						'.title-box.scaled',
						'.content-box.scaled',
						'.temperature-input'
					]);
				}, 500);
			} else {
				highlightElements([
					'.formula-step.scaled',
					'.title-box.scaled',
					'.content-box.scaled',
					'.temperature-input'
				]);
			}
		},
		out: function () {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
				this.timeoutId = undefined;
			}
			removeHighlightFromElements([
				'.formula-step.scaled',
				'.title-box.scaled',
				'.temperature-input',
				'.content-box.scaled'
			]);
			if (!['temperature', 'sampling'].includes(get(textbookCurrentPageId)))
				expandedBlock.set({ id: null });
		},
		complete: () => {
			removeFingerFromElements(['.temperature-input']);
			if (get(textbookCurrentPageId) === 'temperature') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'temperature'
				});
			}
		}
	},
	{
		id: 'sampling',
		title: '샘플링 전략(Sampling Strategy)',
		content:
			'<p>마지막으로 다음 토큰을 선택할 전략이 필요합니다. 여러 전략이 있지만 자주 쓰이는 것은 다음과 같습니다. 그리디 탐색(Greedy search)은 항상 가장 점수가 높은 토큰을 고릅니다. <strong>Top-k</strong>는 가장 가능성 높은 k개의 토큰만 남기고, <strong>top-p</strong>는 누적 확률이 최소 p 이상이 되는 최소한의 토큰 집합을 남깁니다 — 가능성이 낮은 토큰은 미리 잘라내는 방식입니다.</p><p>그 다음 소프트맥스가 남은 로짓을 확률로 바꾸고, 그 중에서 한 토큰을 무작위로 선택해 결과로 내놓습니다.</p>',
		on: function () {
			if (get(expandedBlock).id !== 'softmax') {
				expandedBlock.set({ id: 'softmax' });
				this.timeoutId = setTimeout(() => {
					highlightElements([
						'.formula-step.sampling',
						'.title-box.sampling',
						'.sampling-input',
						'.content-box.sampling'
					]);
				}, 500);
			} else {
				highlightElements([
					'.formula-step.sampling',
					'.title-box.sampling',
					'.sampling-input',
					'.content-box.sampling'
				]);
			}
		},
		out: function () {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
				this.timeoutId = undefined;
			}
			removeHighlightFromElements([
				'.formula-step.sampling',
				'.title-box.sampling',
				'.sampling-input',
				'.content-box.sampling'
			]);
			if (!['temperature', 'sampling'].includes(get(textbookCurrentPageId)))
				expandedBlock.set({ id: null });
		},
		complete: () => {
			removeFingerFromElements(['.sampling-input']);
			if (get(textbookCurrentPageId) === 'sampling') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'sampling'
				});
			}
		}
	},
	{
		id: 'residual',
		title: '잔차 연결(Residual Connection)',
		content: `<p>트랜스포머에는 모델 성능을 높이는 보조 기능들이 있습니다. 그 예로 <strong>잔차 연결</strong>은 계층의 입력을 출력에 더해, 많은 블록을 거치며 정보가 사라지지 않도록 합니다. GPT-2에서는 각 블록에서 두 번 사용되어 깊은 스택의 학습을 효과적으로 만듭니다.</p>`,
		on: function () {
			this.timeoutId = setTimeout(
				() => {
					highlightElements(['.operation-col.residual', '.residual-start']);
					drawLine();
				},
				get(isExpandOrCollapseRunning) ? 500 : 0
			);
		},
		out: function () {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
				this.timeoutId = undefined;
			}
			removeHighlightFromElements(['.operation-col.residual', '.residual-start']);
			removeLine();
		}
	},
	{
		id: 'layer-normalization',
		title: '층 정규화(Layer Normalization)',
		content: `<p><strong>층 정규화</strong>는 입력 값의 평균과 분산이 일정하도록 조정해 학습과 추론을 안정화합니다. 이는 모델이 초기 가중치에 덜 민감해지도록 만들어 보다 효과적인 학습을 돕습니다. GPT-2에서는 셀프 어텐션 직전, MLP 직전, 그리고 최종 출력 직전 — 한 블록 안에 여러 번 적용됩니다.</p>`,
		on: () => {
			highlightElements(['.operation-col.ln']);
		},
		out: () => {
			removeHighlightFromElements(['.operation-col.ln']);
		}
	},
	{
		id: 'dropout',
		title: '드롭아웃(Dropout)',
		content: `<p>학습 단계에서 <strong>드롭아웃</strong>은 숫자 사이의 연결 일부를 무작위로 꺼 특정 패턴에 과적합되는 것을 방지합니다. 이를 통해 모델은 더 강건한 특징을 학습하며, 보지 않은 데이터에도 잘 일반화합니다. GPT-2도 드롭아웃을 사용하지만, 최신 LLM은 거대한 데이터셋으로 학습하기 때문에 과적합 우려가 적어 종종 생략합니다. 추론(inference) 시점에는 드롭아웃이 꺼져 있습니다.</p>`,
		on: () => {
			highlightElements(['.operation-col.dropout']);
		},
		out: () => {
			removeHighlightFromElements(['.operation-col.dropout']);
		}
	}
	// {
	// 	id: 'final',
	// 	title: `Let's explore!`,
	// 	content: '',
	// 	on: () => {},
	// 	out: () => {}
	// }
];

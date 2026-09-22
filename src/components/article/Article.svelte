<script>
	import tailwindConfig from '../../../tailwind.config';
	import resolveConfig from 'tailwindcss/resolveConfig';
	import Katex from '~/utils/Katex.svelte';
</script>

<div id="description">
	<div class="article-section" data-click="article-intro">
		<h1>트랜스포머란 무엇인가?</h1>

		<p>
			트랜스포머(Transformer)는 인공지능 접근 방식을 근본적으로 바꾼 신경망 아키텍처입니다.
			2017년에 발표된 선구적인 논문
			<a
				href="https://dl.acm.org/doi/10.5555/3295222.3295349"
				title="ACM Digital Library"
				target="_blank">"Attention Is All You Need"</a
			>
			에서 처음 소개된 이후, 딥러닝 모델의 표준 아키텍처로 자리 잡았으며 OpenAI의 <strong
				>GPT</strong
			>, Meta의 <strong>Llama</strong>, Google의 <strong>Gemini</strong> 같은 텍스트 생성 모델을
			움직이는 핵심 엔진이 되었습니다. 텍스트뿐 아니라
			<a
				href="https://huggingface.co/learn/audio-course/en/chapter3/introduction"
				title="Hugging Face"
				target="_blank">오디오 생성</a
			>,
			<a
				href="https://huggingface.co/learn/computer-vision-course/unit3/vision-transformers/vision-transformers-for-image-classification"
				title="Hugging Face"
				target="_blank">이미지 인식</a
			>,
			<a href="https://elifesciences.org/articles/82819" title="eLife"
				>단백질 구조 예측</a
			>, 그리고 심지어
			<a
				href="https://www.deeplearning.ai/the-batch/reinforcement-learning-plus-transformers-equals-efficiency/"
				title="Deep Learning AI"
				target="_blank">게임 플레이</a
			>에 이르기까지 다양한 영역에서 활용되며 그 범용성을 입증하고 있습니다.
		</p>
		<p>
			본질적으로 텍스트 생성형 트랜스포머는 <strong>다음 토큰 예측(next-token prediction)</strong
			>의 원리로 동작합니다. 사용자가 텍스트 프롬프트를 입력하면, 그 입력 뒤에 이어질 <em
				>가장 가능성 높은 다음 토큰(단어 또는 단어의 일부)</em
			>이 무엇인지를 맞히는 것이 목표입니다. 트랜스포머의 핵심 혁신과 강력함은 셀프 어텐션(self-attention)
			메커니즘에 있으며, 이를 통해 전체 시퀀스를 한 번에 처리하고 이전 아키텍처보다 더 효과적으로
			장거리 의존 관계를 포착할 수 있습니다.
		</p>
		<p>
			GPT-2 계열 모델은 텍스트 생성 트랜스포머의 대표적인 예입니다. Transformer Explainer는
			<a href="https://huggingface.co/openai-community/gpt2" title="Hugging Face" target="_blank"
				>GPT-2</a
			>
			(small) 모델을 구동하며, 이 모델은 1억 2,400만 개의 파라미터를 가지고 있습니다. 최신 혹은 가장
			강력한 트랜스포머 모델은 아니지만, 현재 최첨단 모델들과 동일한 핵심 아키텍처 구성 요소와 원리를
			공유하기 때문에 기초 개념을 익히기에 이상적인 출발점입니다.
		</p>
	</div>

	<div class="article-section" data-click="article-overview">
		<h1>트랜스포머 아키텍처</h1>

		<p>
			모든 텍스트 생성형 트랜스포머는 다음과 같은 <strong>세 가지 핵심 구성 요소</strong>로 이루어져
			있습니다.
		</p>
		<ol>
			<li>
				<strong class="bold-purple">임베딩(Embedding)</strong>: 텍스트 입력은 토큰(token)이라는
				작은 단위로 나뉘며, 각 토큰은 단어 또는 단어의 일부가 될 수 있습니다. 이 토큰들은 의미 정보를
				담은 수치 벡터인 임베딩으로 변환됩니다.
			</li>
			<li>
				<strong class="bold-purple">트랜스포머 블록(Transformer Block)</strong>은 모델의 기본
				구성 단위로, 입력 데이터를 처리하고 변환합니다. 각 블록에는 다음이 포함됩니다.
				<ul class="">
					<li>
						<strong>어텐션 메커니즘(Attention Mechanism)</strong>은 트랜스포머 블록의 핵심
						구성 요소입니다. 토큰들이 서로 정보를 주고받도록 하여 문맥 정보와 단어 간 관계를
						파악합니다.
					</li>
					<li>
						<strong>MLP(다층 퍼셉트론, Multilayer Perceptron) 계층</strong>은 각 토큰을
						독립적으로 처리하는 순방향 신경망입니다. 어텐션 계층이 토큰 간 정보 전달을 담당한다면,
						MLP는 각 토큰의 표현을 정교하게 다듬는 역할을 합니다.
					</li>
				</ul>
			</li>
			<li>
				<strong class="bold-purple">출력 확률(Output Probabilities)</strong>: 마지막 선형 계층과
				소프트맥스 계층이 처리된 임베딩을 확률로 변환하여 모델이 다음 토큰을 예측할 수 있도록 합니다.
			</li>
		</ol>
	</div>

	<div class="article-section" id="embedding" data-click="article-embedding">
		<h2>임베딩(Embedding)</h2>
		<p>
			트랜스포머 모델로 텍스트를 생성하려면 다음과 같은 프롬프트를 입력으로 넣습니다.
			<code>"Data visualization empowers users to"</code>. 이 입력은 모델이 이해하고 처리할 수 있는
			형식으로 변환되어야 합니다. 바로 이 지점에서 임베딩이 등장합니다. 임베딩은 텍스트를 모델이 다룰 수
			있는 수치 표현으로 바꿔 줍니다. 프롬프트를 임베딩으로 변환하려면 1) 입력 토큰화, 2) 토큰
			임베딩 얻기, 3) 위치 정보 추가, 마지막으로 4) 토큰과 위치 인코딩을 합산해 최종 임베딩을 만드는
			과정을 거칩니다. 각 단계를 차례대로 살펴보겠습니다.
		</p>
		<div class="figure">
			<img src="./article_assets/embedding.png" width="65%" />
		</div>
		<div class="figure-caption">
			그림 <span class="attention">1</span>. 임베딩 계층의 확장된 모습으로, 입력 프롬프트가 벡터
			표현으로 변환되는 과정을 보여 줍니다. 과정은 <span class="fig-numbering">(1)</span> 토큰화,
			(2) 토큰 임베딩, (3) 위치 인코딩, (4) 최종 임베딩으로 이루어집니다.
		</div>
		<div class="article-subsection">
			<h3>1단계: 토큰화(Tokenization)</h3>
			<p>
				토큰화는 입력 텍스트를 토큰이라 불리는 더 작고 다루기 쉬운 조각으로 분리하는 과정입니다.
				토큰은 단어 하나 또는 단어의 일부가 될 수 있습니다. <code>"Data"</code>와
				<code>"visualization"</code>은 각각 고유한 토큰이 되지만, <code>"empowers"</code>는 두 개의
				토큰으로 분리됩니다. 사용 가능한 전체 토큰의 어휘(vocabulary)는 모델 학습 전에 정해지며,
				GPT-2의 어휘에는 <code>50,257</code>개의 고유한 토큰이 포함되어 있습니다. 이렇게 입력
				텍스트를 고유한 ID를 가진 토큰들로 분할하면, 임베딩으로부터 각 토큰의 벡터 표현을 얻을 수
				있습니다.
			</p>
		</div>
		<div class="article-subsection" id="article-token-embedding">
			<h3>2단계. 토큰 임베딩(Token Embedding)</h3>
			<p>
				GPT-2(small)는 어휘에 속한 각 토큰을 768차원의 벡터로 표현합니다. 벡터의 차원 수는 모델에
				따라 달라집니다. 이러한 임베딩 벡터들은 <code>(50,257, 768)</code> 형태의 행렬에 저장되며,
				여기에 약 3,900만 개의 파라미터가 포함되어 있습니다! 이 거대한 행렬 덕분에 모델은 각 토큰에
				의미를 부여할 수 있습니다. 즉, 언어에서 사용 방식이나 의미가 비슷한 토큰들은 이 고차원
				공간에서 가까이, 서로 다른 토큰들은 멀리 떨어져 배치됩니다.
			</p>
		</div>
		<div class="article-subsection" id="article-positional-embedding">
			<h3>3단계. 위치 인코딩(Positional Encoding)</h3>
			<p>
				임베딩 계층은 또한 각 토큰이 입력 프롬프트에서 어느 위치에 있는지에 대한 정보도 함께
				부여합니다. 모델마다 위치 인코딩 방식은 조금씩 다릅니다. GPT-2는 학습 과정에서 자체적으로
				위치 인코딩 행렬을 처음부터 학습해 사용합니다.
			</p>

			<!-- <div class="article-subsection-l2">
	<h4>Alternative Positional Encoding Approach <strong class='attention'>[POTENTIALLY COLLAPSIBLE]</strong></h4>
	<p>
	  Other models, like the original Transformer and BERT,
	  use sinusoidal functions for positional encoding.

	  This sinusoidal encoding is deterministic and designed to reflect
	  the absolute as well as the relative position of each token.
	</p>
	<p>
	  Each position in a sequence is assigned a unique mathematical
	  representation using a combination of sine and cosine functions.

	  For a given position, the sine function represents even dimensions,
	  and the cosine function represents odd dimensions within the positional encoding vector.

	  This periodic nature ensures that each position has a consistent encoding,
	  independent of the surrounding context.
	</p>

	<p>
	  Here’s how it works:
	</p>

	<span class='attention'>
	  SINUSOIDAL POSITIONAL ENCODING EQUATION
	</span>

	<ul>
	  <li>
		<strong>Sine Function</strong>: Used for even indices of the embedding vector.
	  </li>
	  <li>
		<strong>Cosine Function</strong>: Used for odd indices of the embedding vector.
	</ul>

	<p>
	  Hover over individual encoding values in the matrix above to
	  see how it's calculated using the sins and cosine functions.
	</p>
  </div> -->
		</div>
		<div class="article-subsection">
			<h3>4단계. 최종 임베딩(Final Embedding)</h3>
			<p>
				마지막으로 토큰 임베딩과 위치 인코딩을 더해 최종 임베딩 표현을 얻습니다. 이렇게 합쳐진
				표현은 토큰의 의미 정보와 입력 시퀀스 내에서의 위치 정보를 모두 담고 있습니다.
			</p>
		</div>
	</div>

	<div class="article-section" data-click="article-transformer-block">
		<h2>트랜스포머 블록(Transformer Block)</h2>

		<p>
			트랜스포머의 처리 핵심은 트랜스포머 블록에 있으며, 이 블록은 멀티 헤드 셀프 어텐션과 다층
			퍼셉트론(MLP) 계층으로 구성됩니다. 대부분의 모델은 이러한 블록을 여러 개 쌓아 순차적으로
			연결합니다. 토큰 표현은 첫 번째 블록부터 마지막 블록까지 계층을 거치며 점차 풍부해지고,
			이를 통해 모델은 각 토큰에 대한 정교한 이해를 점진적으로 구축해 나갑니다. 이러한 계층적 접근은
			입력에 대한 고차원적인 표현으로 이어집니다. 우리가 살펴보고 있는 GPT-2(small) 모델은 이러한 블록을
			<code>12</code>개 포함하고 있습니다.
		</p>
	</div>

	<div class="article-section" id="self-attention" data-click="article-attention">
		<h3>멀티 헤드 셀프 어텐션(Multi-Head Self-Attention)</h3>
		<p>
			셀프 어텐션 메커니즘은 모델이 시퀀스 내 토큰들 사이의 관계를 파악하도록 합니다. 이를 통해 각
			토큰의 표현이 다른 토큰들의 영향을 받아 만들어집니다. 여러 어텐션 헤드를 두면 모델은 다양한
			관점에서 이러한 관계를 동시에 살펴볼 수 있습니다. 예를 들어 한 헤드는 짧은 거리의 문법적 연결을
			담을 수 있고, 다른 헤드는 더 넓은 의미적 맥락을 따라갑니다. 이어지는 절에서는 멀티 헤드 셀프
			어텐션이 어떻게 단계별로 계산되는지 살펴봅니다.
		</p>
		<div class="article-subsection-l2">
			<h4>1단계: 쿼리(Query), 키(Key), 밸류(Value) 행렬</h4>

			<div class="figure pt-10">
				<img src="./article_assets/QKV.png" width="80%" />
				<div class="text-xs">
					<Katex
						displayMode
						math={`
		QKV_{ij} = ( \\sum_{d=1}^{768} \\text{Embedding}_{i,d} \\cdot \\text{Weights}_{d,j}) + \\text{Bias}_j
		`}
					/>
				</div>
			</div>
			<div class="figure-caption">
				그림 <span class="attention">2</span>. 원본 임베딩으로부터 쿼리, 키, 밸류 행렬을 계산합니다.
			</div>

			<p>
				각 토큰의 임베딩 벡터는 세 개의 벡터로 변환됩니다.
				<span class="q-color">쿼리(Q, Query)</span>,
				<span class="k-color">키(K, Key)</span>,
				<span class="v-color">밸류(V, Value)</span>. 이 세 벡터는 입력 임베딩 행렬에 학습된
				<span class="q-color">Q</span>,
				<span class="k-color">K</span>,
				<span class="v-color">V</span> 가중치 행렬을 곱해 얻습니다. 이 행렬들의 직관적인 이해를
				돕기 위해 웹 검색에 비유를 들어보겠습니다.
			</p>
			<ul>
				<li>
					<strong class="q-color font-medium">쿼리(Q, Query)</strong>는 검색 엔진 입력창에
					입력하는 검색어입니다. 이 토큰이 <em>"어떤 정보를 더 찾고 싶은지"</em>를 표현합니다.
				</li>
				<li>
					<strong class="k-color font-medium">키(K, Key)</strong>는 검색 결과 창에 표시되는 각
					웹 페이지의 제목입니다. 쿼리가 참고할 수 있는 토큰 후보들을 나타냅니다.
				</li>
				<li>
					<strong class="v-color font-medium">밸류(V, Value)</strong>는 실제로 표시되는 웹
					페이지의 본문 내용입니다. 검색어(쿼리)와 가장 잘 맞는 결과(키)를 찾았다면, 그 페이지의
					본문(밸류)을 가져오고 싶은 것입니다.
				</li>
			</ul>
			<p>
				QKV 값을 이용해 모델은 어텐션 점수(attention score)를 계산하며, 이는 각 토큰이 다음 예측을
				수행할 때 얼마나 많은 비중으로 주의를 기울여야 하는지를 결정합니다.
			</p>
		</div>
		<div class="article-subsection-l2">
			<h4>2단계: 멀티 헤드 분할(Multi-Head Splitting)</h4>
			<p>
				<span class="q-color">쿼리</span>, <span class="k-color">키</span>,
				<span class="v-color">밸류</span>
				벡터는 여러 헤드로 나뉩니다. GPT-2(small)의 경우 <code>12</code>개의 헤드로 분할됩니다.
				각 헤드는 임베딩의 일부 구간을 독립적으로 처리하여 서로 다른 문법적·의미적 관계를 파악합니다.
				이러한 설계는 다양한 언어적 특징의 병렬 학습을 가능하게 하며, 모델의 표현력을 높여 줍니다.
			</p>
		</div>
		<div class="article-subsection-l2">
			<h4>3단계: 마스크드 셀프 어텐션(Masked Self-Attention)</h4>
			<p>
				각 헤드에서는 마스크드 셀프 어텐션이 계산됩니다. 이 메커니즘은 입력의 관련 부분에 집중하면서
				미래 토큰에는 접근하지 못하도록 하여 모델이 시퀀스를 생성할 수 있게 합니다.
			</p>

			<div class="figure">
				<img src="./article_assets/attention.png" width="80%" align="middle" />
			</div>
			<div class="figure-caption">
				그림 <span class="attention">3</span>. 쿼리, 키, 밸류 행렬을 사용해 마스크드 셀프 어텐션을
				계산합니다.
			</div>

			<ul>
				<li>
					<strong>내적(Dot Product)</strong>:
					<span class="q-color">쿼리</span>
					와 <span class="k-color">키</span>
					행렬의 내적은 <strong>어텐션 점수</strong>를 결정하며, 모든 입력 토큰 사이의 관계를
					반영하는 정사각 행렬을 생성합니다.
				</li>
				<li>
					<strong>스케일링 · 마스킹</strong>: 어텐션 점수는 스케일링되고, 어텐션 행렬의 위쪽
					삼각 영역에 마스킹이 적용되어 모델이 미래 토큰을 미리 볼 수 없도록 해당 값을 음의 무한대로
					설정합니다. 모델은 미래를 "엿보지" 않고도 다음 토큰을 예측하는 법을 학습해야 합니다.
				</li>
				<li>
					<strong>소프트맥스 · 드롭아웃</strong>: 마스킹과 스케일링이 끝난 어텐션 점수는 소프트맥스를
					통해 확률로 변환되며, 이어서 드롭아웃으로 선택적으로 정규화됩니다. 각 행의 합은 1이 되며,
					해당 토큰이 자기보다 앞에 있는 다른 토큰들을 얼마나 참조해야 하는지를 나타냅니다.
				</li>
			</ul>
		</div>
		<div class="article-subsection-l2">
			<h4>4단계: 출력과 연결(Concatenation)</h4>
			<p>
				모델은 마스크드 셀프 어텐션 점수와 <span class="v-color">밸류</span> 행렬을 곱해 셀프
				어텐션 메커니즘의 <span class="purple-color">최종 출력</span>을 얻습니다. GPT-2는
				<code>12</code>개의 셀프 어텐션 헤드를 가지며, 각 헤드는 토큰 간 서로 다른 관계를 파악합니다.
				이 헤드들의 출력은 연결(concatenation)된 뒤 선형 투영(linear projection)을 거칩니다.
			</p>
		</div>
	</div>

	<div class="article-section" id="article-activation" data-click="article-mlp">
		<h3>MLP: 다층 퍼셉트론(Multi-Layer Perceptron)</h3>

		<div class="figure">
			<img src="./article_assets/mlp.png" width="70%" align="middle" />
		</div>
		<div class="figure-caption">
			그림 <span class="attention">4</span>. MLP 계층을 사용해 셀프 어텐션 표현을 더 높은 차원으로
			투영하여 모델의 표현력을 강화합니다.
		</div>

		<p>
			셀프 어텐션의 여러 헤드가 입력 토큰들 사이의 다양한 관계를 파악하고 나면, 연결된 출력이 다층
			퍼셉트론(MLP) 계층을 통과하여 모델의 표현력이 한 단계 더 강화됩니다. MLP 블록은 두 개의 선형
			변환과 그 사이의
			<a
				href="https://en.wikipedia.org/wiki/Rectified_linear_unit#Gaussian-error_linear_unit_(GELU)"
				>GELU</a
			>
			활성화 함수로 구성됩니다.
		</p>
		<p>
			첫 번째 선형 변환은 입력 차원을 <code>768</code>에서 <code>3072</code>로 4배 확장합니다. 이 확장
			단계를 통해 모델은 토큰 표현을 더 높은 차원 공간으로 투영하여, 원래 차원에서는 드러나지 않았던
			더 풍부하고 복잡한 패턴을 포착할 수 있게 됩니다.
		</p>
		<p>
			두 번째 선형 변환은 차원을 다시 원래 크기인 <code>768</code>로 축소합니다. 이 압축 단계를
			거치면서 확장 단계에서 도입한 유용한 비선형 변환은 유지한 채, 표현을 다시 다루기 쉬운 크기로
			되돌립니다.
		</p>
		<p>
			토큰 간 정보를 통합하는 셀프 어텐션과 달리, MLP는 각 토큰을 독립적으로 처리하여 단순히 한
			공간에서 다른 공간으로 매핑하며, 그 과정에서 모델의 전체적인 용량을 풍부하게 만듭니다.
		</p>
	</div>

	<div class="article-section" id="article-prob" data-click="article-prob">
		<h2>출력 확률(Output Probabilities)</h2>
		<p>
			입력이 모든 트랜스포머 블록을 통과해 처리되면, 최종 출력이 마지막 선형 계층을 거쳐 토큰 예측을
			준비합니다. 이 계층은 최종 표현을 <code>50,257</code>차원 공간으로 투영하며, 어휘의 각 토큰마다
			하나의 값인 <code>로짓(logit)</code>이 대응됩니다. 어떤 토큰이든 다음 단어가 될 수 있으므로,
			이 과정을 통해 각 토큰을 다음 단어가 될 가능성 순으로 단순히 정렬할 수 있습니다. 이어서
			소프트맥스 함수를 적용해 로짓을 합이 1인 확률 분포로 변환합니다. 이렇게 하면 다음 토큰이
			될 가능성에 따라 토큰을 샘플링할 수 있습니다.
		</p>

		<div class="figure py-5">
			<img src="./article_assets/softmax.png" width="70%" />
		</div>
		<div class="figure-caption">
			그림 <span class="attention">5</span>. 어휘의 각 토큰은 모델 출력 로짓을 기반으로 확률을
			부여받습니다. 이 확률은 각 토큰이 시퀀스의 다음 단어가 될 가능성을 결정합니다.
		</div>

		<p id="article-temperature" data-click="article-temperature">
			마지막 단계는 이 확률 분포에서 다음 토큰을 샘플링하는 것입니다. <code>temperature</code
			>하이퍼파라미터가 이 과정에서 매우 중요한 역할을 합니다. 수학적으로는 매우 간단한 연산입니다.
			모델 출력 로짓을 <code>temperature</code>로 나눠 주기만 하면 됩니다.
		</p>

		<ul>
			<li>
				<code>temperature = 1</code>: 로짓을 1로 나누는 것은 소프트맥스 출력에 아무런 영향을 주지
				않습니다.
			</li>
			<li>
				<code>temperature &lt; 1</code>: 낮은 temperature는 확률 분포를 더 뾰족하게 만들어
				모델이 더 확신 있게, 더 결정적으로 작동하게 합니다. 결과적으로 출력이 더 예측 가능해집니다.
			</li>
			<li>
				<code>temperature &gt; 1</code>: 높은 temperature는 확률 분포를 더 평평하게 만들어
				가능성이 낮은 토큰도 경쟁에 참여할 수 있게 합니다. 그 결과 생성 텍스트에 더 많은 무작위성이
				들어가고, 이는 종종 모델의 <em>"창의성"</em>이라 불립니다.
			</li>
		</ul>

		<p id="article-sampling" data-click="article-sampling">
			이 밖에도 샘플링 과정은 <code>top-k</code>와 <code>top-p</code> 파라미터로 더 세밀하게 제어할
			수 있습니다.
		</p>
		<ul>
			<li>
				<code>top-k 샘플링</code>: 후보 토큰을 확률이 가장 높은 상위 k개로 제한해, 가능성이 낮은
				옵션들을 걸러냅니다.
			</li>
			<li>
				<code>top-p 샘플링</code>: 누적 확률이 임계값 p 이상이 되는 최소한의 토큰 집합만을 고려해,
				가장 가능성이 높은 토큰들만 기여하면서도 다양성은 유지합니다.
			</li>
		</ul>
		<p>
			<code>temperature</code>, <code>top-k</code>, <code>top-p</code>를 함께 조정하면 결정적인
			출력과 다양한 출력 사이의 균형을 맞춰, 특정 요구에 맞게 모델의 동작을 튜닝할 수 있습니다.
		</p>
	</div>

	<div class="article-section" data-click="article-advanced-features">
		<h2>보조 아키텍처 기능</h2>

		<p>
			트랜스포머 모델의 성능을 높여 주는 여러 보조 아키텍처 기능이 있습니다. 모델 전체 성능에는
			중요하지만, 아키텍처의 핵심 개념을 이해하는 데 있어서는 상대적으로 덜 중요합니다. 층 정규화(Layer
			Normalization), 드롭아웃(Dropout), 잔차 연결(Residual Connection)은 트랜스포머 모델에서, 특히
			학습 단계에서 핵심적인 구성 요소입니다. 층 정규화는 학습을 안정시키고 모델이 더 빠르게 수렴하도록
			도와줍니다. 드롭아웃은 뉴런을 무작위로 비활성화해 과적합을 방지합니다. 잔차 연결은 그래디언트가
			네트워크를 직접 흐를 수 있도록 하며, 그래디언트 소실 문제를 막는 데 기여합니다.
		</p>
		<div class="article-subsection" id="article-ln">
			<h3>층 정규화(Layer Normalization)</h3>

			<p>
				층 정규화는 학습 과정을 안정화하고 수렴을 개선하는 데 기여합니다. 이는 입력의 특성(feature)
				축을 따라 정규화하여 활성화 값의 평균과 분산이 일정하도록 만듭니다. 이러한 정규화는 내부
				공변량 변화(internal covariate shift)와 관련된 문제를 완화해, 모델이 더 효과적으로 학습하고
				초기 가중치에 대한 민감도를 낮춥니다. 층 정규화는 트랜스포머 블록 안에서 두 번 적용되는데,
				셀프 어텐션 메커니즘 직전과 MLP 계층 직전에 각각 한 번씩입니다.
			</p>
		</div>
		<div class="article-subsection" id="article-dropout">
			<h3>드롭아웃(Dropout)</h3>

			<p>
				드롭아웃은 신경망의 과적합을 방지하기 위한 정규화 기법으로, 학습 도중 모델 가중치의 일부를
				무작위로 0으로 설정합니다. 이는 모델이 더 강건한 특징을 학습하도록 유도하며, 특정 뉴런에 대한
				의존도를 낮춰 네트워크가 새로운 데이터에도 잘 일반화하도록 돕습니다. 모델 추론(inference) 시점에는
				드롭아웃이 비활성화됩니다. 이는 학습된 서브네트워크들의 앙상블을 사용하는 것과 같아서, 모델
				성능을 한 단계 더 끌어올립니다.
			</p>
		</div>
		<div class="article-subsection" id="article-residual">
			<h3>잔차 연결(Residual Connection)</h3>

			<p>
				잔차 연결은 2015년 ResNet 모델에서 처음 도입되었습니다. 이 아키텍처 혁신은 매우 깊은 신경망의
				학습을 가능하게 한 것으로, 딥러닝에 큰 전환점이 되었습니다. 본질적으로 잔차 연결은 한 개 이상의
				층을 우회하는 지름길이며, 한 계층의 입력을 그 출력에 더해 줍니다. 이는 그래디언트 소실 문제를
				완화해 여러 트랜스포머 블록이 쌓인 깊은 네트워크의 학습을 더 쉽게 만듭니다. GPT-2에서는 각
				트랜스포머 블록 내에서 두 번 사용되는데, 한 번은 MLP 직전, 한 번은 MLP 이후에 적용되어
				그래디언트가 보다 쉽게 흐르고, 역전파 시 앞쪽 계층이 충분한 업데이트를 받도록 합니다.
			</p>
		</div>
	</div>

	<div class="article-section" data-click="article-interactive-features">
		<h1>인터랙티브 기능</h1>
		<p>
			Transformer Explainer는 트랜스포머 내부 동작을 탐색할 수 있도록 인터랙티브하게 설계되었습니다.
			아래는 직접 사용해 볼 수 있는 인터랙티브 기능들입니다.
		</p>

		<ul>
			<li>
				<strong>직접 텍스트 시퀀스를 입력</strong>해 모델이 이를 어떻게 처리하고 다음 단어를 어떻게
				예측하는지 확인해 보세요. 어텐션 가중치와 중간 계산 결과를 살펴보고, 최종 출력 확률이 어떻게
				계산되는지 알아보세요.
			</li>
			<li>
				<strong>temperature 슬라이더</strong>를 사용해 모델 예측의 무작위성을 조절해 보세요.
				temperature 값을 어떻게 설정하느냐에 따라 모델 출력을 더 결정적으로 만들 수도, 더 창의적으로
				만들 수도 있습니다.
			</li>
			<li>
				<strong>top-k와 top-p 샘플링 방식</strong>을 선택해 추론 과정의 샘플링 동작을 조정해
				보세요. 다양한 값으로 실험하면서 확률 분포가 어떻게 변하고 모델 예측에 어떤 영향을 주는지
				관찰해 보세요.
			</li>
			<li>
				<strong>어텐션 맵과 상호작용</strong>하며 모델이 입력 시퀀스의 어떤 토큰에 집중하는지 살펴보세요.
				토큰 위에 마우스를 올려 해당 토큰의 어텐션 가중치를 강조 표시하고, 모델이 문맥과 단어 간
				관계를 어떻게 파악하는지 탐색해 보세요.
			</li>
		</ul>
	</div>

	<div class="article-section" data-click="article-video">
		<h2>비디오 튜토리얼</h2>
		<div class="video-container">
			<iframe
				src="https://www.youtube.com/embed/ECR4oAwocjs"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			>
			</iframe>
		</div>
	</div>

	<div class="article-section" data-click="article-implementation">
		<h2>Transformer Explainer는 어떻게 구현되었나요?</h2>
		<p>
			Transformer Explainer는 브라우저에서 직접 실행되는 실시간 GPT-2(small) 모델을 특징으로 합니다.
			이 모델은 Andrej Karpathy의
			<a href="https://github.com/karpathy/nanoGPT" title="Github" target="_blank"
				>nanoGPT 프로젝트</a
			>
			기반의 PyTorch 구현에서 파생되었으며, 브라우저에서의 원활한 실행을 위해
			<a href="https://onnxruntime.ai/" title="ONNX" target="_blank">ONNX Runtime</a>
			형식으로 변환되었습니다. 인터페이스는 JavaScript로 작성되었으며, 프론트엔드 프레임워크로는
			<a href="https://kit.svelte.dev/" title="Svelte" target="_blank">Svelte</a>를,
			동적 시각화에는
			<a href="https://d3js.org/" title="D3" target="_blank">D3.js</a>를 사용했습니다. 수치 값들은
			사용자 입력에 따라 실시간으로 갱신됩니다.
		</p>
	</div>

	<div class="article-section" data-click="article-credit">
		<h2>Transformer Explainer는 누가 만들었나요?</h2>
		<p>
			Transformer Explainer는
			<a href="https://aereeeee.github.io/" target="_blank">Aeree Cho</a>,
			<a href="https://www.linkedin.com/in/chaeyeonggracekim/" target="_blank">Grace C. Kim</a>,
			<a href="https://alexkarpekov.com/" target="_blank">Alexander Karpekov</a>,
			<a href="https://alechelbling.com/" target="_blank">Alec Helbling</a>,
			<a href="https://zijie.wang/" target="_blank">Jay Wang</a>,
			<a href="https://seongmin.xyz/" target="_blank">Seongmin Lee</a>,
			<a href="https://bhoov.com/" target="_blank">Benjamin Hoover</a>, 그리고
			<a href="https://poloclub.github.io/polochau/" target="_blank">Polo Chau</a>
			가 조지아 공과대학교(Georgia Institute of Technology)에서 함께 만들었습니다.
		</p>
	</div>
</div>

<style lang="scss">
	a {
		color: theme('colors.blue.500');

		&:hover {
			color: theme('colors.blue.700');
		}
	}

	.bold-purple {
		color: theme('colors.purple.700');
		font-weight: bold;
	}

	code {
		color: theme('colors.gray.500');
		background-color: theme('colors.gray.50');
		font-family: theme('fontFamily.mono');
	}

	.q-color {
		color: theme('colors.blue.400');
	}

	.k-color {
		color: theme('colors.red.400');
	}

	.v-color {
		color: theme('colors.green.400');
	}

	.purple-color {
		color: theme('colors.purple.500');
	}

	.article-section {
		padding-bottom: 2rem;
	}
	.architecture-section {
		padding-top: 1rem;
	}
	.video-container {
		position: relative;
		padding-bottom: 56.25%; /* 16:9 aspect ratio */
		height: 0;
		overflow: hidden;
		max-width: 100%;
		background: #000;
	}

	.video-container iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	#description {
		padding-bottom: 3rem;
		margin-left: auto;
		margin-right: auto;
		max-width: 78ch;
	}

	#description h1 {
		color: theme('colors.purple.700');
		font-size: 2.2rem;
		font-weight: 300;
		padding-top: 1rem;
	}

	#description h2 {
		// color: #444;
		color: theme('colors.purple.700');
		font-size: 2rem;
		font-weight: 300;
		padding-top: 1rem;
	}

	#description h3 {
		color: theme('colors.gray.700');
		font-size: 1.6rem;
		font-weight: 200;
		padding-top: 1rem;
	}

	#description h4 {
		color: theme('colors.gray.700');
		font-size: 1.6rem;
		font-weight: 200;
		padding-top: 1rem;
	}

	#description p {
		margin: 1rem 0;
	}

	#description p img {
		vertical-align: middle;
	}

	#description .figure-caption {
		font-size: 0.8rem;
		margin-top: 0.5rem;
		text-align: center;
		margin-bottom: 2rem;
	}

	#description ol {
		margin-left: 3rem;
		list-style-type: decimal;
	}

	#description li {
		margin: 0.6rem 0;
	}

	#description p,
	#description div,
	#description li {
		color: theme('colors.gray.600');
		line-height: 1.6;
	}

	#description small {
		font-size: 0.8rem;
	}

	#description ol li img {
		vertical-align: middle;
	}

	#description .video-link {
		color: theme('colors.blue.600');
		cursor: pointer;
		font-weight: normal;
		text-decoration: none;
	}

	#description ul {
		list-style-type: disc;
		margin-left: 2.5rem;
		margin-bottom: 1rem;
	}

	#description a:hover,
	#description .video-link:hover {
		text-decoration: underline;
	}

	.figure,
	.video {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>

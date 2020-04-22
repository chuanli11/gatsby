---
title: Tacotron
typora-copy-images-to: ./
disableTableOfContents: true
---

[Text to Speech Synthesis](https://en.wikipedia.org/wiki/Speech_synthesis) generates audios of human speech from text input. Early concatenative synthesis approaches stitch small units of pre-recorded waveforms, hence produce strong boundary artifacts between the units. Statistical parametric approaches can directly generate smoother audio trajectories, but at the cost of producing audio that sounds muffled and unnatural compared to human speech.

[Tacotron](https://arxiv.org/abs/1712.05884) is a neural network architecture that learns speech synthesis in an end to end fashion. Once trained, the model can synthesize natural sounding speech that is difficult to distinguish from real human speech. It achieves a [mean opinion score](https://en.wikipedia.org/wiki/Mean_opinion_score) (MOS) of 4.53, which is comparable to a MOS of 4.58 for professionally recorded speech.

## Architecture

Tacotron is composed of a recurrent sequence-to-sequence feature prediction network that maps character embeddings to mel-scale spectrograms, followed by a autoregressive WaveNet model (green block) acting as a vocoder to synthesize time-domain waveforms from those spectrograms. The recurrent sequence-to-sequence network is composed of an encoder and a decoder with attention. The encoder (blue blocks) converts a character sequence into a latent feature representation. The decoder (orange blocks) maps the latent representation to a spectrogram. The attention network (gray block) summarizes the full encoded sequence as a fixed-length context vector for each decoder output step.


![Tacotron](tacotron.png)
*Archiecture diagram of Tacotron. Image from [Natural TTS Synthesis by Conditioning WaveNet on Mel Spectrogram Predictions, Shen et al](https://arxiv.org/abs/1712.05884)*

## Dataset

Tacotron is trained on the [LJSpeech-1.1](https://keithito.com/LJ-Speech-Dataset/) dataset. It is a public domain speech dataset consisting of 13,100 short audio clips of a single speaker reading passages from 7 non-fiction books. A transcription is provided for each clip. Clips vary in length from 1 to 10 seconds and have a total length of approximately 24 hours. 

The original [Tacotron paper](https://arxiv.org/abs/1712.05884) evaluated the performance of the model with user studies: 100 randomly generated audios from the test set were sent to a human rating service similar to Amazon’s Mechanical Turk, where each sample is rated by at least 8 raters on a scale from 1 to 5 with 0.5 point increments, from which a subjective mean opinion score (MOS) is calculated. The MOS is calculated as the arithmetic mean over single ratings performed by human subjects. Tacotron scored (MOS) of 4.53, which is comparable to a MOS of 4.58 for professionally recorded speech.

<!-- Mel stands for Mel Spectrogram, a way of visualizing sound as a Spectrogram in [Mel Scale](https://en.wikipedia.org/wiki/Mel_scale). The Mel Scale converts sound into numbers so that the distance between the numbers matches the distance as it registers to the human ear. It is a “perceptual” scale, where each tone in Hz has a perceptual pitch on the Mel Scale.  -->

<!-- ![MovieLens](movielens.png)*MovieLens gives personalized movie recommendations to users based on their rating. Image from [MovieLens](https://movielens.org/)* -->


Below is a sample from [LJSpeech-1.1](https://keithito.com/LJ-Speech-Dataset/) dataset:


```
Many animals of even complex structure which live parasitically within others are wholly devoid of an alimentary cavity.
```

<iframe allowtransparency="true" style="background: #FFFFFF;" width="100%" height="155" frameborder="0"
src="https://keithito.com/LJ-Speech-Dataset/LJ025-0076.wav"></iframe>

## GPU Benchmark

import { ModelChart } from './../../../www/src/components/lambda-items.js'

We benchmark the training throughput for Tacotron using different GPUs in both FP32 and FP16 precisions. The benchmark is conducted using NVidia docker images. You can use this [repository](https://github.com/lambdal/deeplearning-benchmark) to reproduce the results in the charts below.


<ModelChart selected_model='tacotron2' selected_gpu='V100' selected_metric="throughput"/>

*Maximum training throughput of Tacotron (Mels/Second)*


<ModelChart selected_model='tacotron2' selected_gpu='V100' selected_metric="bs"/>

*Maximum training batch size of Tacotron (Mels/Batch)*

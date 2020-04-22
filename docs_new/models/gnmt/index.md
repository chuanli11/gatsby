---
title: GNMT
typora-copy-images-to: ./
disableTableOfContents: true
---

[Machine translation](https://en.wikipedia.org/wiki/Machine_translation) is a sub-field of computational linguistics that investigates the use of software to translate text or speech from one language to another. Recurrent neural networks with [long short-term memory](https://www.bioinf.jku.at/publications/older/2604.pdf) have been widely used to build neural machine translation (NMT) systems with the strength of learning directly, in an end-to-end fashion, the mapping from input text to associated output text. Unfortunately, recurrent systems are known to be computationally expensive both in training and in translation inference – sometimes prohibitively so in the case of very large data sets and large models.

Developed in 2016, Google’s Neural Machine Translation system (GNMT) strikes good performance in both accuracy and speed. On the WMT’14 English-to-French and English-to-German benchmarks, GNMT achieves competitive results to state-of-the-art. Using a human side-by-side evaluation on a set of isolated simple sentences, it reduces translation errors by an average of 60% compared to Google’s phrase-based production system.



## Architecture

GNMT consists of a deep LSTM network with 8 encoder and 8 decoder layers using residual connections as well as attention connections from the decoder network to the encoder. To improve parallelism and therefore decrease training time, attention mechanism is used to connect the bottom layer of the decoder to the top layer of the encoder. To accelerate the final translation speed, low-precision arithmetic is used during inference computations. Words are divided into a limited set of common sub-word units ([wordpieces](https://github.com/google/sentencepiece)) for both input and output.

The GNMT v2 model is similar to the original model described in [Wu et al](https://arxiv.org/abs/1609.08144)'s paper. The most important difference between the two models is in the attention mechanism. In V2, the output from the first LSTM layer of the decoder goes into the attention module, then the re-weighted context is concatenated with inputs to all subsequent LSTM layers in the decoder at the current time step.

![GNMT](gnmt.png)
*Archiecture diagram of GNMT v2. Image from NVidia's DeepLearningExample [Repo](https://github.com/NVIDIA/DeepLearningExamples/tree/master/PyTorch/Translation/GNMT#model-overview)*

## Dataset

A popular metric for evaluating machine translation models is the BLEU score. It stands for "Bilingual Evaluation Understudy" and evaluates the quality of a machine translated sentence by comparing it against one or multiple human reference translations. The approach works by counting matching n-grams in the candidate translation to n-grams in the reference text, where 1-gram or unigram would be each token and a bigram comparison would be each word pair. The comparison is made regardless of word order. The result is typically measured on a 0 to 1 scale, with 1 as the hypothetical “perfect” translation.

The Workshop on Machine Translation ([WMT](http://www.statmt.org/wmt19/)) dataset is the standard benchmark for machine translation. The original GNMT paper trained and evaluated its models on the `WMT En->Fr` dataset (36M training sentence pairs) and `WMT En->De` dataset (5M training sentence pair), and scored 38.95% BLEU and 24.17% BLEU respectively. 



## GPU Benchmark

import { ModelChart } from './../../../www/src/components/lambda-items.js'

We benchmark the training throughput for GNMT using different GPUs in both FP32 and FP16 precisions. The benchmark is conducted using NVidia docker images. You can use this [repository](https://github.com/lambdal/deeplearning-benchmark) to reproduce the results in the charts below.


<ModelChart selected_model='gnmt' selected_gpu='V100' selected_metric="throughput"/>

*Maximum training throughput of GNMT (Tokens/Second)*


<ModelChart selected_model='gnmt' selected_gpu='V100' selected_metric="bs"/>

*Maximum training batch size of GNMT (Tokens/Batch)*

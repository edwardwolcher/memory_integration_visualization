# Memory Integration [A Visualization]

**Edward Wolcher for DXArts 490b "On the Bias" Assignment #2 Data Transformations**

**[CLICK HERE TO SEE THE LIVE PROJECT](https://edwardwolcher.github.io/memory_integration_visualization/)**

## Overview

This project is an attempt to explore the relationship between memory, dreaming and data through the medium of digital art, particularly sound collage. An elemental tension in our course's examination of data as such and the question of bias is the distinction between the continuity of experience and its quantization. Datasets in computation are, by definition, quantized: regardless of formal abstraction they are ultimately an array of bytes. Beyond computation, data are always enacted through a primal distinguishing between elements—an argument towards the intrinsic plurality of "data"—which is one sense of our primary metaphor "on the bias". The fabric of reality needs to be cut in order to be apprehended as data, an act always oriented along bias.

One base-level ontology of data is this biased cutting of the flow of time. This notion resonates with foundational questions in the philosophy of Mathematics: the intuition that undergirds the formal system of numbers as such is an act of cutting the continuum into the first binary[^1]. This first-order binary can be described as "that which is now vs. that which is not", or perhaps "the present vs. the past": a sort of boolean operation which midwifes every datum and filters every dataset.

Stepping back from this philosophical abstraction: this is an approach to thinking about memory itself as a sort of dataset: an enclosure of the continuity of experience into digestible containers. There is compelling evidence that the primary neurological function of sleep is the "integration" of memory into long-term patterns, and the beginnings of an account of dreaming as the side-effect of this process (something like a sorting algorithm being run on the day). [^2] I've found this to be consistent with my own intuitions about sleep, memory and dreaming.

Another medium intimately concerned with the quantization of continuous signals into discrete data is digital sound. Sound signals are continuous, but must be transformed into thousands of samples to be recorded, manipulated, and played back digitally[^3]. The drive to develop rigorous methods for the computation and handling of large audio datasets was an early defining project for the field of academic digital art. 

In this piece, I was inspired by this connection between the central philosophical themes of bias/continuity, the experience of memory as a dataset, and digital sound. To create a personal dataset I discreetly "wired" myself with a portable digital audio recorder and microphone and went about the business of a Friday afternoon and evening: finishing a work week and spending a few hours with friends in a local bar. The recording provided a perspective of the evening (including the terrible experience of listening to my own voice) that bore an uncanny resemblance to remembering. This evoked the warbling, uncertain recollections and regrets at the end of a long night at the end of a long week. Working with this dataset, I built a visualization to explore that experience.

## Description

The piece is a small web-application built using the p5.js library[^4]. The application is controlled by a user whose mouse-cursor takes the form of an illustrated brain against a dark field. When the user clicks their mouse button, a "memory" is spawned. Each memory is a short selection of audio from the 5+ hour original data recording, along with a visual representation in the form of a colored circle and waveform. The colors are defined by the index of the memory (hotter colors start the evening, cooler colors end it), and the memory objects are subjected to a minimal physics engine pulling them in orbit around a central node. As the memories move, they reveal an image below the darkness of the background: a diagram of a head with lines of psychic energy emenating from it.[^5] As memories play text cascades from the top of the window. This text was generated using a somewhat primitive speech-to-text algorithm and it is wildly inaccurate (the recording quality didn't help!), but creates a fascinating collage of misheard words and fragments of meaning.

Users can choose to click slowly or quickly—generating quiet moments or cacophonies of memory. As a user moves their mouse through the window, its position defines the relative volume of each memory file playing back. The lifetime of the memories are randomly chosen, however, and some fade out fast: simulating the bubbling up and falling away of the day as you drift into sleep. The background returns to a shadowed darkness with only the vaguest hint of the psychic outline. The struggle to unify the whole into a continuity remains impossible.

## How to Use

Click the background of the window to generate memories. Make sure your volume is on (headphones recommended). Move the mouse to explore the sound-space.

[^1]: The reference here is to the [Dedekind Cut](https://en.wikipedia.org/wiki/Dedekind_cut) and debates over the constructability of mathematics. This is obviously a big topic but an intriguing font of interdisciplinary richness. Husserl's phenomenology, in addition to inspiring much of the tradition that has fed into contemporary critical theory, inspired profound debates in the foundation of mathematics, particularly the so called "Intuitionist" program developed by L.E.J Brouwer.
[^2]: Wamsley, Erin J. “Dreaming and offline memory consolidation.” *Current neurology and neuroscience reports* vol. 14,3 (2014): 433. doi:10.1007/s11910-013-0433-5
[^3]: Sound is commonly encoded at 44.1 thousand samples per second (the standard for audio CDs). This resolution of digital information is higher than humans can distinguish between analog audio.
[^4]: p5.js is an extension of the Processing creative coding framework, and was originally developed by former class speaker Lauren McCarthy, in one of her many amazing contributions!
[^5]: The image was taken from [this excellent piece](https://publicdomainreview.org/essay/lofty-only-in-sound-crossed-wires-and-community-in-19th-century-dreams) at the Public Domain Review.

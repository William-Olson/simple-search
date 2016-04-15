FROM scorpil/rust:nightly

RUN apt-get update && \
    apt-get install -y libssl-dev

ENV TERM xterm

RUN mkdir -p /data/src
COPY ./Cargo.toml /data
COPY ./Cargo.lock /data
COPY ./src /data/src

WORKDIR /data

RUN cargo build --release

RUN ls -1Fs --block-size=K /data

CMD target/release/repo_collector ; bash

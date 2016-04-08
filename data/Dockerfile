FROM scorpil/rust:nightly

RUN apt-get update && \
    apt-get install -y libssl-dev

ENV TERM xterm

COPY ./ /data
WORKDIR /data
VOLUME /data

RUN cargo build

CMD ["/data/target/debug/repo_collector"]

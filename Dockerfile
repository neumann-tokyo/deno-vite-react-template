ARG DENO_VERSION=1.42.1
ARG BIN_IMAGE=denoland/deno:bin-${DENO_VERSION}

FROM ${BIN_IMAGE} AS bin

# -------------

FROM debian:bookworm

ARG USERNAME=alice

RUN apt-get update -qq && \
  apt-get install -y git vim less sudo curl && \
  useradd -r -m -s /bin/bash -d /home/$USERNAME -u 998 $USERNAME && \
  echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME && \
  chmod 0440 /etc/sudoers.d/$USERNAME && \
  mkdir -p /home/$USERNAME/web && \
  mkdir -p /home/$USERNAME/deno-dir && \
  chown -R $USERNAME:$USERNAME /home/$USERNAME/web && \
  chown -R $USERNAME:$USERNAME /home/$USERNAME/deno-dir
RUN curl -fsSL https://deb.nodesource.com/setup_21.x | bash - && \
  apt-get update -qq && apt-get install -y nodejs && \
  npm install -g @biomejs/biome

ENV DENO_DIR /home/$USERNAME/deno-dir
ENV DENO_INSTALL_ROOT /usr/local

ARG DENO_VERSION
ENV DENO_VERSION=${DENO_VERSION}
COPY --from=bin /deno /usr/bin/deno

USER $USERNAME
WORKDIR /home/$USERNAME/web
COPY . /home/$USERNAME/web
RUN cat /home/$USERNAME/web/.devcontainer/.bashrc > /home/$USERNAME/.bashrc

CMD ["bash"]

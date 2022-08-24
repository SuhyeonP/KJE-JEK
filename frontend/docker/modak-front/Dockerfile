FROM nginx:1.22.0-alpine

ENV MODAK_FRONT_ROOT /opt/modak-front

WORKDIR $MODAK_FRONT_ROOT

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

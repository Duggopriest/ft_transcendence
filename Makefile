

COMPOSE		=	docker-compose.yml


COMPOSE_CMD = docker-compose -f ${COMPOSE}

build:
	${COMPOSE_CMD} up --build

up:
	${COMPOSE_CMD} up

down:
	${COMPOSE_CMD} down

dbclean: down
	docker volume prune -f

clean: dbclean
	rm -rf backend/dist backend/node_modules front/node_modules

fclean: down clean
	docker system prune -af

.PHONY: all build up down clean fclean
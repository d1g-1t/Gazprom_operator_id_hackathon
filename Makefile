.PHONY: setup build up down logs clean

COMPOSE=docker compose

setup:
	@echo "🚀 Starting Gazprom Operator ID Hackathon project..."
	@if [ ! -f .env ]; then \
		echo "📝 Creating .env file from .env.example..."; \
		cp .env.example .env; \
		echo "✅ .env file created!"; \
	fi
	@echo "📦 Building Docker images..."
	$(COMPOSE) build --parallel
	@echo "✅ Build completed!"
	@echo "🎬 Starting containers..."
	$(COMPOSE) up -d
	@echo "✨ Project is ready!"
	@echo ""
	@echo "🎯 Access points:"
	@echo "   Frontend: http://localhost:3000"
	@echo "   Backend:  http://localhost:8000"
	@echo "   Swagger:  http://localhost:8000/swagger"
	@echo "   Admin:    http://localhost:8000/admin"
	@echo ""
	@echo "📊 Check status: make logs"

build:
	$(COMPOSE) build --parallel

up:
	$(COMPOSE) up -d

down:
	$(COMPOSE) down -v

logs:
	$(COMPOSE) logs -f

clean:
	$(COMPOSE) down -v --rmi all

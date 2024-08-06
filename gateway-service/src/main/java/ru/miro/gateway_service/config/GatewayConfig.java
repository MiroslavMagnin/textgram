package ru.miro.gateway_service.config;

import lombok.RequiredArgsConstructor;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import ru.miro.gateway_service.jwt.JwtAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class GatewayConfig {

    private final JwtAuthenticationFilter filter;

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()

                .route("auth-service", r -> r.path("/auth/**")
                        .uri("http://auth:8090")) // http://localhost:8090

                .route("user-service", r -> r.path("/user/**")
                        .filters(f -> f.filter(filter))
                        .uri("http://user:8091")) // http://localhost:8091

                .route("notification-service", r -> r.path("/notification/**")
                        .filters(f -> f.filter(filter))
                        .uri("http://notification:8092")) // http://localhost:8092

                .route("analytics-service", r -> r.path("/analytics/**")
                        .filters(f -> f.filter(filter))
                        .uri("http://analytcis:8093")) // http://localhost:8093

                .route("post-service", r -> r.path("/post/**")
                        .filters(f -> f.filter(filter))
                        .uri("http://post:8094")) // http://localhost:8094

                .route("feed-service", r -> r.path("/feed/**")
                        .filters(f -> f.filter(filter))
                        .uri("http://feed:8095")) // http://localhost:8095

                .build();
    }

    // CORS (cross-origin resource sharing)
    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.addAllowedOrigin("http://localhost:63342"); // frontend URL
        corsConfig.addAllowedHeader("*");
        corsConfig.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);

        return new CorsWebFilter(source);
    }

}

package edu.itstep.api.securitySettings;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
//                 .csrf().disable()
//                 .authorizeHttpRequests((authorize) -> authorize
//                         .anyRequest().permitAll()
//                 )
//                .authorizeHttpRequests((authorize) -> authorize
////                        .requestMatchers(HttpMethod.POST, "/users").permitAll()
//                        .anyRequest().permitAll()
//                )
                .authorizeHttpRequests((authorize) -> authorize
//                        .requestMatchers("/api/public").permitAll()
//                        .requestMatchers("/api/private").authenticated()
//                        .requestMatchers("/api/private-scoped").hasAuthority("SCOPE_read:messages")
//                         .anyRequest().permitAll()

                                .requestMatchers("/users/hasProfileConfirmation/**").permitAll()
                                .requestMatchers("/countries").permitAll()
                                .requestMatchers("/goals").permitAll()
                                .requestMatchers("/genres").permitAll()
                                .requestMatchers("/vibes").permitAll()
                      //   .anyRequest().permitAll()
                    .anyRequest().authenticated()
                )
                .cors(withDefaults())
                // .csrf(withDefaults())

                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(withDefaults())
                )
                .build();
    }

}
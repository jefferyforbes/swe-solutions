package org.example;

import java.net.URI;
import java.net.http.HttpHeaders;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;

/**
 * Example code which uses Java 11 java.net.http.HttpClient
 * to send HTTP Requests and receive HTTP Responses.
 * Note that you can also use Spring code to send HTTP Requests but
 * we have chosen to use java.net.http.HttpClient as it is nice and easy!
 */
public class HttpClientApp {
    public static void main( String[] args ) {

        String url = "https://http-challenge.multiverse-coaches.io/";

        try {
            java.net.http.HttpClient client = java.net.http.HttpClient.newHttpClient();

            // first request (GET)
            HttpRequest request = HttpRequest.newBuilder(
                    URI.create(url))
                    .header("accept", "application/json")
                    .build();

            // TODO - work out best way to print the raw request
            
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println(response.body());

            // second request (POST)
            String jsonName = "{" +
                    "\"name\":\"mandy\"" +
                    "}";

            request = HttpRequest.newBuilder(
                    URI.create(url+"apprentices"))
                    .header("Content-Type", "application/json")
                    .header("accept", "text/plain; text/html; /*/")
                    .method("POST", HttpRequest.BodyPublishers.ofString(jsonName))
                    .build();

            System.out.println(request);

            response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println(response.body());

            HttpHeaders headers = response.headers();

            String headerValue = null;

            Map<String, List<String>> map = headers.map();

            for (Map.Entry<String, List<String>> entry:map.entrySet()) {
                if ("your-id".equalsIgnoreCase(entry.getKey())) {
                    headerValue = entry.getValue().get(0);
                    break;
                }
            }

            /* // Lambda alternative for header retrieval
            List<String> val = headers.map().entrySet().stream()
                    .filter(entry -> entry.getKey().equalsIgnoreCase("your-id"))
                    .map(Map.Entry::getValue)
                    .collect(Collectors.toList())
                    .stream()
                    .findFirst()
                    .orElse(null);
                    */

            // third request (header)
            request = HttpRequest.newBuilder(
                    URI.create(url+"apprentices/7b37ba22"))
                    .header("Content-Type", "application/json")
                    .headers("your-id", headerValue)
                    .header("accept", "text/plain; text/html; /*/")
                    .build();

            response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println(response.body());

            // forth request (PATCH)
            String urlCodedName = "guests=fred%2Cbarny%2Cwilma";

            request = HttpRequest.newBuilder(
                    URI.create(url+"apprentices/7b37ba22"))
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .headers("your-id", headerValue)
                    .header("accept", "text/plain; text/html; /*/") //
                    .method("PATCH", HttpRequest.BodyPublishers.ofString(urlCodedName))
                    .build();

            response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println(response.body());

            // fifth request (GET with Query Parameters)
            String menuQueryParams = "starter=prawns&main=roast%20chicken&dessert=banana%20split";

            request = HttpRequest.newBuilder(
                    URI.create(url+"apprentices/"+headerValue+"?"+menuQueryParams))
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .headers("your-id", headerValue)
                    .header("accept", "text/plain; text/html; /*/") //
                    .build();

            response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println(response.body());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

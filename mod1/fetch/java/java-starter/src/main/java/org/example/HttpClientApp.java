package org.example;

import java.net.URI;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;


/**
 * Starter code which uses Java 11 java.net.http.HttpClient
 * to send HTTP Requests and receive HTTP Responses.
 * Note that you can also use Spring code to send HTTP Requests but
 * we have chosen to use java.net.http.HttpClient as it is nice and easy!
 */
public class HttpClientApp {
    public static void main( String[] args ) {

        String url = "https://http-challenge.whitehatcoaches.org.uk/";

        try {
            java.net.http.HttpClient client = java.net.http.HttpClient.newHttpClient();

            // first request (GET)
            HttpRequest request = HttpRequest.newBuilder(
                    URI.create(url))
                    .header("accept", "application/json")
                    .build();

            System.out.println(request);
            
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println(response.body());

            // TODO - add code for second request (POST) here


            /* // The code below will help you retrieve the "your-id" header from the HTTP Response
            Map<String, List<String>> map = headers.map();

            for (Map.Entry<String, List<String>> entry:map.entrySet()) {
                if ("your-id".equalsIgnoreCase(entry.getKey())) {
                    headerValue = entry.getValue().get(0);
                    break;
                }
            }*/

            // TODO - add code for third request (header) here


            // TODO - add code for forth request (PATCH) here


            // TODO - add code for fifth request (GET with Query Parameters) here

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

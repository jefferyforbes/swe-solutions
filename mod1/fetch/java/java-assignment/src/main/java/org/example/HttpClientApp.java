package org.example;

import java.io.IOException;
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

    private static final java.net.http.HttpClient client = java.net.http.HttpClient.newHttpClient();
    private static final String url = "https://http-challenge.multiverse-coaches.io/";

    public HttpResponse<String> getRequest() throws IOException, InterruptedException {

        HttpRequest request = HttpRequest.newBuilder(
                URI.create(url))
                .header("accept", "application/json")
                .build();

        // TODO - work out best way to print the raw request

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        System.out.println(response.body());
        return response;
    }

    public HttpResponse<String> postRequest()  throws IOException, InterruptedException {

        String jsonName = "{" +
                "\"name\":\"mandy\"" +
                "}";

        HttpRequest request = HttpRequest.newBuilder(
                URI.create(url+"apprentices"))
                .header("Content-Type", "application/json")
                .header("accept", "text/plain; text/html; /*/")
                .method("POST", HttpRequest.BodyPublishers.ofString(jsonName))
                .build();

        HttpResponse<String>  response = client.send(request, HttpResponse.BodyHandlers.ofString());

        System.out.println(response.body());
        return response;
    }

    public HttpResponse<String> headerRequest(String headerValue)  throws IOException, InterruptedException {
        // third request (header)
        HttpRequest request = HttpRequest.newBuilder(
                URI.create(url+"apprentices/"+headerValue))
                .header("Content-Type", "application/json")
                .headers("your-id", headerValue)
                .header("accept", "text/plain; text/html; /*/")
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());

        return response;
    }

    public HttpResponse<String> patchRequest(String headerValue)  throws IOException, InterruptedException {

        String urlEncodedName = "guests=fred%2Cbarny%2Cwilma";

        HttpRequest request = HttpRequest.newBuilder(
                URI.create(url+"apprentices/"+headerValue))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .headers("your-id", headerValue)
                .header("accept", "text/plain; text/html; /*/") //
                .method("PATCH", HttpRequest.BodyPublishers.ofString(urlEncodedName))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());

        return response;
    }

    public HttpResponse<String> queryRequest(String headerValue)  throws IOException, InterruptedException {

        String menuQueryParams = "starter=prawns&main=roast%20chicken&dessert=banana%20split";

        HttpRequest request = HttpRequest.newBuilder(
                URI.create(url+"apprentices/"+headerValue+"/menus?"+menuQueryParams))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .headers("your-id", headerValue)
                .header("accept", "text/plain; text/html; /*/") //
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());

        return response;
    }

    public HttpResponse<String> deleteRequest(String headerValue)  throws IOException, InterruptedException {

        HttpRequest request = HttpRequest.newBuilder(
                URI.create(url+"apprentices/"+headerValue))
                .method("DELETE", HttpRequest.BodyPublishers.noBody())
                .headers("your-id", headerValue)
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());

        return response;
    }

    public static void main( String[] args ) {

        HttpClientApp client = new HttpClientApp();

        try {
            HttpResponse<String> getResponse = client.getRequest();
            HttpResponse<String> postResponse = client.postRequest();

            // retrieve the value of the "your-id" header
            HttpHeaders headers = postResponse.headers();
            String headerValue = null;

            Map<String, List<String>> map = headers.map();

            for (Map.Entry<String, List<String>> entry:map.entrySet()) {
                if ("your-id".equalsIgnoreCase(entry.getKey())) {
                    headerValue = entry.getValue().get(0);
                    break;
                }
            }

            HttpResponse<String> headerResponse = client.headerRequest(headerValue);
            HttpResponse<String> patchResponse = client.patchRequest(headerValue);
            HttpResponse<String> queryResponse = client.queryRequest(headerValue);
            HttpResponse<String> deleteResponse = client.deleteRequest(headerValue);

        } catch (Exception e) {
            // TODO - better error handling
            e.printStackTrace();
        }
    }
}

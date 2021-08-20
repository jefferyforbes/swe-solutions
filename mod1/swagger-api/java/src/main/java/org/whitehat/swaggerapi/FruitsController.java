package org.whitehat.swaggerapi;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FruitsController {
   @RequestMapping(value = "/fruits", method = RequestMethod.GET)
   public List<String> getFruits() {
      List<String> fruitList = new ArrayList<>();
      fruitList.add("Apples");
      fruitList.add("Oranges");
      return fruitList;
   }
   @RequestMapping(value = "/fruits", method = RequestMethod.POST)
   public String createFruit() {
      return "Fruit has been eaten successfully";
   }
}
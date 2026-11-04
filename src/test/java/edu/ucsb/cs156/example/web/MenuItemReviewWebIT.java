package edu.ucsb.cs156.example.web;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

import edu.ucsb.cs156.example.WebTestCase;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ActiveProfiles("integration")
@DirtiesContext(classMode = ClassMode.BEFORE_EACH_TEST_METHOD)
public class MenuItemReviewWebIT extends WebTestCase {
  @Test
  public void admin_user_can_create_review() throws Exception {
    setupUser(true);

    page.getByText("MenuItemReview").click();

    page.getByText("Create Review").click();
    assertThat(page.getByText("Create New MenuItemReview")).isVisible();
    page.getByTestId("MenuItemReviewForm-itemid").fill("1");
    page.getByTestId("MenuItemReviewForm-reviewerEmail").fill("cgaucho@ucsb.edu");
    page.getByTestId("MenuItemReviewForm-stars").fill("4");
    page.getByTestId("MenuItemReviewForm-comments").fill("Not bad");
    // date nonsense
    page.getByTestId("MenuItemReviewForm-dateReviewed").pressSequentially("04-16-002025-05:15-2");
    page.getByTestId("MenuItemReviewForm-submit").click();

    assertThat(page.getByTestId("MenuItemReviewTable-cell-row-0-col-comments")).hasText("Not bad");

    // page.getByTestId("RestaurantTable-cell-row-0-col-Edit-button").click();
    // assertThat(page.getByText("Edit Restaurant")).isVisible();
    // page.getByTestId("RestaurantForm-description").fill("THE BEST");
    // page.getByTestId("RestaurantForm-submit").click();

    // assertThat(page.getByTestId("RestaurantTable-cell-row-0-col-description")).hasText("THE
    // BEST");

    // page.getByTestId("RestaurantTable-cell-row-0-col-Delete-button").click();

    // assertThat(page.getByTestId("RestaurantTable-cell-row-0-col-name")).not().isVisible();
  }

  @Test
  public void regular_user_cannot_create_restaurant() throws Exception {
    setupUser(false);

    page.getByText("MenuItemReview").click();

    assertThat(page.getByText("Create Review")).not().isVisible();
    assertThat(page.getByTestId("MenuItemReviewTable-cell-row-0-col-id")).not().isVisible();
  }
}

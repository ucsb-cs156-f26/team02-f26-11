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
public class UCSBOrganizationWebIT extends WebTestCase {
  @Test
  public void admin_user_can_create_edit_delete_organization() throws Exception {
    setupUser(true);

    page.getByText("UCSBOrganization").click();

    page.getByText("Create Organization").click();
    assertThat(page.getByText("Create New Organization")).isVisible();
    page.getByTestId("UCSBOrganizationForm-orgCode").fill("SUN");
    page.getByTestId("UCSBOrganizationForm-orgTranslationShort").fill("Sun Club");
    page.getByTestId("UCSBOrganizationForm-orgTranslation").fill("Sunshine Club @ UCSB");
    page.getByTestId("UCSBOrganizationForm-inactive").fill("No");
    page.getByTestId("UCSBOrganizationForm-submit").click();

    assertThat(page.getByTestId("UCSBOrganizationTable-cell-row-1-col-orgCode")).hasText("SUN");
    assertThat(page.getByTestId("UCSBOrganizationTable-cell-row-1-col-orgTranslationShort"))
        .hasText("Sun Club");
    assertThat(page.getByTestId("UCSBOrganizationTable-cell-row-2-col-orgTranslation"))
        .hasText("Sunshine Club @ UCSB");
    assertThat(page.getByTestId("UCSBOrganizationTable-cell-row-3-col-inactive")).hasText("No");

    page.getByTestId("UCSBOrganizationTable-cell-row-0-col-Edit-button").click();
    assertThat(page.getByText("Edit Organization")).isVisible();
    page.getByTestId("UCSBOrganizationForm-orgTranslation").fill("Sunny Day Club @ UCSB");
    page.getByTestId("UCSBOrganizationForm-submit").click();

    assertThat(page.getByTestId("UCSBOrganizationTable-cell-row-2-col-orgTranslation"))
        .hasText("Sunny Day Club @ UCSB");

    page.getByTestId("UCSBOrganizationTable-cell-row-0-col-Delete-button").click();

    assertThat(page.getByTestId("UCSBOrganizationTable-cell-row-0-col-orgCode")).not().isVisible();
  }

  @Test
  public void regular_user_cannot_create_organization() throws Exception {
    setupUser(false);

    page.getByText("UCSBOrganization").click();

    assertThat(page.getByText("Create Organization")).not().isVisible();
    assertThat(page.getByTestId("UCSBOrganizationTable-cell-row-0-col-orgCode")).not().isVisible();
    assertThat(page.getByTestId("UCSBOrganizationTable-cell-row-1-col-orgTranslationShort"))
        .not()
        .isVisible();
    assertThat(page.getByTestId("UCSBOrganizationTable-cell-row-2-col-orgTranslation"))
        .not()
        .isVisible();
    assertThat(page.getByTestId("UCSBOrganizationTable-cell-row-3-col-inactive")).not().isVisible();
  }
}

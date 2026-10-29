import { Routes, Route } from "react-router";
import HomePage from "main/pages/HomePage";
import ProfilePage from "main/pages/ProfilePage";
import AdminUsersPage from "main/pages/AdminUsersPage";

import UCSBDatesIndexPage from "main/pages/UCSBDates/UCSBDatesIndexPage";
import UCSBDatesCreatePage from "main/pages/UCSBDates/UCSBDatesCreatePage";
import UCSBDatesEditPage from "main/pages/UCSBDates/UCSBDatesEditPage";

import RestaurantIndexPage from "main/pages/Restaurants/RestaurantIndexPage";
import RestaurantCreatePage from "main/pages/Restaurants/RestaurantCreatePage";
import RestaurantEditPage from "main/pages/Restaurants/RestaurantEditPage";

import UCSBDiningCommonsMenuItemIndexPage from "main/pages/UCSBDiningCommonsMenuItem/UCSBDiningCommonsMenuItemIndexPage";
import UCSBDiningCommonsMenuItemCreatePage from "main/pages/UCSBDiningCommonsMenuItem/UCSBDiningCommonsMenuItemCreatePage";
import UCSBDiningCommonsMenuItemEditPage from "main/pages/UCSBDiningCommonsMenuItem/UCSBDiningCommonsMenuItemEditPage";

import UCSBOrganizationIndexPage from "main/pages/UCSBOrganization/UCSBOrganizationIndexPage";
import UCSBOrganizationCreatePage from "main/pages/UCSBOrganization/UCSBOrganizationCreatePage";
import UCSBOrganizationEditPage from "main/pages/UCSBOrganization/UCSBOrganizationEditPage";

import HelpRequestIndexPage from "main/pages/HelpRequest/HelpRequestIndexPage";
import HelpRequestCreatePage from "main/pages/HelpRequest/HelpRequestCreatePage";
import HelpRequestEditPage from "main/pages/HelpRequest/HelpRequestEditPage";

import MenuItemReviewIndexPage from "main/pages/MenuItemReview/MenuItemReviewIndexPage";
import MenuItemReviewCreatePage from "main/pages/MenuItemReview/MenuItemReviewCreatePage";
import MenuItemReviewEditPage from "main/pages/MenuItemReview/MenuItemReviewEditPage";

import RecommendationRequestIndexPage from "main/pages/RecommendationRequest/RecommendationRequestIndexPage";
import RecommendationRequestCreatePage from "main/pages/RecommendationRequest/RecommendationRequestCreatePage";
import RecommendationRequestEditPage from "main/pages/RecommendationRequest/RecommendationRequestEditPage";

import { hasRole, useCurrentUser } from "main/utils/useCurrentUser";

import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const currentUser = useCurrentUser();

  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/profile" element={<ProfilePage />} />

      {hasRole(currentUser, "ROLE_ADMIN") && (
        <Route exact path="/admin/users" element={<AdminUsersPage />} />
      )}

      {/* UCSBDates */}
      {hasRole(currentUser, "ROLE_USER") && (
        <Route exact path="/ucsbdates" element={<UCSBDatesIndexPage />} />
      )}
      {hasRole(currentUser, "ROLE_ADMIN") && (
        <>
          <Route
            exact
            path="/ucsbdates/edit/:id"
            element={<UCSBDatesEditPage />}
          />
          <Route
            exact
            path="/ucsbdates/create"
            element={<UCSBDatesCreatePage />}
          />
        </>
      )}

      {/* Restaurants */}
      {hasRole(currentUser, "ROLE_USER") && (
        <Route exact path="/restaurants" element={<RestaurantIndexPage />} />
      )}
      {hasRole(currentUser, "ROLE_ADMIN") && (
        <>
          <Route
            exact
            path="/restaurants/edit/:id"
            element={<RestaurantEditPage />}
          />
          <Route
            exact
            path="/restaurants/create"
            element={<RestaurantCreatePage />}
          />
        </>
      )}

      {/* UCSBDiningCommonsMenuItem */}
      {hasRole(currentUser, "ROLE_USER") && (
        <Route
          exact
          path="/ucsbdiningcommonsmenuitem"
          element={<UCSBDiningCommonsMenuItemIndexPage />}
        />
      )}
      {hasRole(currentUser, "ROLE_ADMIN") && (
        <>
          <Route
            exact
            path="/ucsbdiningcommonsmenuitem/edit/:id"
            element={<UCSBDiningCommonsMenuItemEditPage />}
          />
          <Route
            exact
            path="/ucsbdiningcommonsmenuitem/create"
            element={<UCSBDiningCommonsMenuItemCreatePage />}
          />
        </>
      )}

      {/* UCSBOrganization */}
      {hasRole(currentUser, "ROLE_USER") && (
        <Route
          exact
          path="/ucsborganization"
          element={<UCSBOrganizationIndexPage />}
        />
      )}
      {hasRole(currentUser, "ROLE_ADMIN") && (
        <>
          <Route
            exact
            path="/ucsborganization/edit/:orgCode"
            element={<UCSBOrganizationEditPage />}
          />
          <Route
            exact
            path="/ucsborganization/create"
            element={<UCSBOrganizationCreatePage />}
          />
        </>
      )}

      {/* MenuItemReview */}
      {hasRole(currentUser, "ROLE_USER") && (
        <Route
          exact
          path="/menuitemreview"
          element={<MenuItemReviewIndexPage />}
        />
      )}
      {hasRole(currentUser, "ROLE_ADMIN") && (
        <>
          <Route
            exact
            path="/menuitemreview/edit/:id"
            element={<MenuItemReviewEditPage />}
          />
          <Route
            exact
            path="/menuitemreview/create"
            element={<MenuItemReviewCreatePage />}
          />
        </>
      )}

      {/* HelpRequest */}
      {hasRole(currentUser, "ROLE_USER") && (
        <Route exact path="/helprequest" element={<HelpRequestIndexPage />} />
      )}
      {hasRole(currentUser, "ROLE_ADMIN") && (
        <>
          <Route
            exact
            path="/helprequest/edit/:id"
            element={<HelpRequestEditPage />}
          />
          <Route
            exact
            path="/helprequest/create"
            element={<HelpRequestCreatePage />}
          />
        </>
      )}

      {/* RecommendationRequest */}
      {hasRole(currentUser, "ROLE_USER") && (
        <Route
          exact
          path="/recommendationrequest"
          element={<RecommendationRequestIndexPage />}
        />
      )}
      {hasRole(currentUser, "ROLE_ADMIN") && (
        <>
          <Route
            exact
            path="/recommendationrequest/edit/:id"
            element={<RecommendationRequestEditPage />}
          />
          <Route
            exact
            path="/recommendationrequest/create"
            element={<RecommendationRequestCreatePage />}
          />
        </>
      )}
    </Routes>
  );
}

export default App;
